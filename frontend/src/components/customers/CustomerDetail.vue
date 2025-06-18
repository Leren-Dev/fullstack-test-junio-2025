<template>
  <div v-if="!loading" class="w-full">
    <div class="flex flex-row gap-2" v-if="customer && customer.id">
      <div class="flex w-3/5 flex-col gap-2">
        <div class="card card-body w-full flex-initial bg-base-300">
          <div class="flex flex-row items-end justify-start gap-5">
            <h2 class="text-3xl">{{ customer.name }}</h2>
            <p>
              Cliente desde el:
              {{ new Date(customer.tn_created_at).toLocaleDateString() }}
            </p>
          </div>
          <div class="mt-5 flex flex-row gap-2">
            <hr class="mr-4 h-full border border-green-300 text-green-300" />
            <div class="w-5/12 text-xl">
              <p>Total gastado</p>
              <p class="mt-2 font-bold">
                {{
                  store && store.main_currency
                    ? formatMoney(customer.total_spent, store.main_currency)
                    : "-"
                }}
                {{ customer.total_spent_currency }}
              </p>
            </div>
            <hr class="mr-4 h-full border border-green-300 text-green-300" />
            <div class="w-5/12 text-xl">
              <p>Pedidos</p>
              <p class="mt-2 font-bold">{{ customer.orders?.length }}</p>
            </div>
          </div>
        </div>
        <div class="card card-body w-full bg-base-300">
          <p class="text-3xl">Ventas</p>
          <div class="grid grid-cols-1 gap-5">
            <div
              class="items-left card flex-row justify-between bg-base-100 p-2"
              v-for="order in customer.orders"
              :key="order.id"
            >
              <div class="flex flex-col self-start">
                <p
                  class="text-lg font-semibold"
                  :class="isDarkTheme ? 'lt-light' : 'lt-dark'"
                >
                  <router-link :to="'/orders/' + order.id">{{
                    "#" + order.number
                  }}</router-link>
                </p>
                <p>
                  {{
                    store && store.main_currency
                      ? formatMoney(order.total, store.main_currency)
                      : "-"
                  }}
                </p>
              </div>
              <div class="flex flex-col items-end gap-2">
                <p>{{ new Date(order.tn_created_at).toLocaleDateString() }}</p>
                <div class="flex flex-row gap-2">
                  <div :class="getClassByStatus(order.status)">
                    Estado: {{ t("order_status_" + order.status) }}
                  </div>
                  <div :class="getClassByStatus(order.payment_status)">
                    Pago: {{ t("order_status_" + order.payment_status) }}
                  </div>
                  <div :class="getClassByStatus(order.shipping_status)">
                    {{
                      order.shipping_pickup_type == "pickup"
                        ? t("Retiro")
                        : t("Envío")
                    }}:
                    {{
                      t(
                        "order_status_" +
                          order.shipping_pickup_type +
                          "_" +
                          order.shipping_status
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-2/5 flex-col gap-2">
        <div class="card card-body w-full flex-initial bg-base-300">
          <p class="text-2xl">Datos del cliente</p>
          <div class="flex flex-col gap-2">
            <p>{{ customer.email }}</p>
            <p>DNI/CUIL: {{ customer.identification }}</p>
            <p>Tel: {{ customer.phone }}</p>
          </div>
        </div>
        <div class="card card-body w-full flex-initial bg-base-300">
          <div class="flex flex-col">
            <div class="mb-2 flex flex-row items-center gap-2">
              <p class="grow-0 text-3xl">Categoría de cliente</p>
              <div
                class="tooltip-hover tooltip-top tooltip-top tooltip"
                data-tip="Asociar con regla de negocio"
              >
                <icon-component
                  name="QuestionMarkCircle"
                  type="solid"
                  classes="h-5 w-5"
                />
              </div>
            </div>
            <select
              v-model="customer.category_id"
              class="select-bordered select w-full max-w-xs"
            >
              <option :value="null">-</option>
              <option v-for="cc of customerCategories" :value="cc.id">
                {{ cc.name }}
              </option>
            </select>
          </div>
          <button
            class="btn btn-accent btn-ghost btn-xs mt-2 max-w-xs items-center justify-center text-accent"
            @click="showCreateModal = true"
          >
            <icon-component name="Plus" type="solid" class="mr-1 w-4" />Añadir
            nueva categoría
          </button>
          <div class="mt-2 flex w-full justify-center gap-5">
            <button
              class="btn btn-primary btn-block btn-sm text-neutral"
              @click="save"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <error-404-page />
    </div>
  </div>
  <div v-else class="w-full">
    <div class="flex flex-row gap-2">
      <div class="flex w-3/5 flex-col gap-2">
        <Skeletor class="card shadow-xl drop-shadow-xl" height="400" />
      </div>
      <div class="flex w-2/5 flex-col gap-2">
        <Skeletor
          class="card shadow-xl drop-shadow-xl"
          height="300"
          :shimmer="false"
        />
      </div>
    </div>
  </div>

  <customer-category-create-modal
    v-if="showCreateModal"
    :loading="loading"
    :show="showCreateModal"
    @hide="handleHideFromCreateModal"
    @save="handleSaveFromCreateModal"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { Skeletor } from "vue-skeletor";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Error404Page from "@/components/errors/404Page.vue";
import CustomerCategoryCreateModal from "./CustomerCategoryCreateModal.vue";
import { notify } from "notiwind";
import { useLayout } from "@/stores/layout";
import { useAuth } from "@/stores/auth";

const auth = useAuth();
const layout = useLayout();
const route = useRoute();
const { t } = useI18n();
const store = computed(() => auth.store);

// Computed
const isDarkTheme = computed(() => layout.currentTheme == "dark");

// Variables
const loading = ref(true);
const customer = ref({});
const customerCategories = ref([]);
const showCreateModal = ref(false);

const queryPage = ref(1);
const queryLimit = ref(20);
const pagination = ref({
  total: 0,
  per_page: queryPage,
  current_page: queryLimit,
  last_page: 1,
  first_page: 1,
  first_page_url: "/?page=1",
  last_page_url: "/?page=1",
  next_page_url: null,
  previous_page_url: null,
});

// Methods
const getCustomer = async () => {
  try {
    const response = await axios.get("customers/" + route.params.id);

    if (response && response.data && response.data.status) {
      customer.value = response.data.customer;
    } else {
      throw new Error(
        "Error getting customer ID: " + route.params.id + " details"
      );
    }
  } catch (error) {
    throw error;
  }
};
const getCustomerCategories = async () => {
  axios
    .get("customer_categories", {
      params: {
        page: queryPage.value,
        limit: queryLimit.value,
      },
    })
    .then((response) => {
      if (response.data.status) {
        pagination.value = response.data.customer_categories.meta;
        customerCategories.value = response.data.customer_categories.data;
      }

      return true;
    })
    .catch((error) => {
      console.log("Error exception fetching Customer Categories:", error);

      return false;
    });
};
const save = async () => {
  loading.value = true;
  try {
    const data = {
      category_id: customer.value.category_id,
    };
    const activateResponse = await axios.put(
      "customers/" + route.params.id,
      data
    );
    if (
      activateResponse &&
      activateResponse.data &&
      activateResponse.data.status
    ) {
      await getCustomer();
      await getCustomerCategories();
      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: "¡Cliente actualizado con éxito!",
        },
        4000
      ); // 4s
    } else {
      console.log("Error while updating Customer");
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: "Ocurrió un error al intentar actualizar el Cliente",
        },
        10000
      ); // 10s
    }
  } catch (error) {
    console.log("Error exception while updating Customer:", error);
    notify(
      {
        group: "bottom-right",
        type: "error",
        title: "Error",
        text: "Ocurrió un error al intentar actualizar el Cliente",
      },
      10000
    ); // 10s
  }
  loading.value = false;
};
const getClassByStatus = (status) => {
  const transparent = ["open"];
  const green = ["closed", "paid", "shipped"];
  const yellow = ["pending", "packed", "unshipped", "refunded"];
  const orange = ["voided", "unpacked", "cancelled"];

  if (transparent.includes(status)) return "rounded px-2 py-1 text-xs border";
  if (green.includes(status))
    return "rounded px-2 py-1 text-xs bg-green-400 text-black";
  if (yellow.includes(status))
    return "rounded px-2 py-1 text-xs bg-yellow-300 text-black";
  if (orange.includes(status))
    return "rounded px-2 py-1 text-xs bg-orange-400 text-black";

  return "rounded p-2 text-xs border";
};
const handleHideFromCreateModal = () => {
  showCreateModal.value = false;
};
const handleSaveFromCreateModal = async (data) => {
  loading.value = true;
  try {
    const createResponse = await axios.post("customer_categories", data);
    if (createResponse && createResponse.data && createResponse.data.status) {
      await getCustomerCategories();
      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: "¡Nueva categoría de cliente creada con éxito!",
        },
        4000
      ); // 4s
    } else {
      console.log("Error while creating new Customer Category");
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: "Ocurrió un error al intentar crear la categoría de cliente",
        },
        10000
      ); // 10s
    }
  } catch (error) {
    console.log("Error exception while creating new Customer Category:", error);
    notify(
      {
        group: "bottom-right",
        type: "error",
        title: "Error",
        text: "Ocurrió un error al intentar crear la categoría de cliente",
      },
      10000
    ); // 10s
  }
  loading.value = false;
  showCreateModal.value = false;
};

// Lifecycle hooks
onMounted(async () => {
  try {
    await getCustomer();
    await getCustomerCategories();
  } catch (error) {
    console.log(error.message || error);
  }
  loading.value = false;
});
</script>
