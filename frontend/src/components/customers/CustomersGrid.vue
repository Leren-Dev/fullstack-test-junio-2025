<template>
  <!-- Filtros sobre Tabla de Customers -->
  <div class="form-control flex w-full flex-row justify-between gap-2">
    <div class="w-3/12">
      <div class="input-bordered input flex flex-row px-2">
        <div class="">
          <icon-component
            class="mx-auto h-full w-5"
            name="MagnifyingGlass"
            type="solid"
          />
        </div>
        <input
          v-model.trim="queryParams.search"
          class="rounded-box w-11/12 border-none bg-base-100 p-0 pl-2"
          type="text"
          placeholder="Razon social, email o DNI/CUIT"
          @input="debouncedFilterStatus"
        />
      </div>
    </div>
    <div class="w-3/12">
      <select
        v-model="queryParams.category"
        class="select-bordered select w-full"
        @input="debouncedFilterStatus"
      >
        <option value="All">{{ t("Todas las categorías") }}</option>
        <option v-for="cc of customerCategories" :value="cc.id">
          {{ cc.name }}
        </option>
      </select>
    </div>
    <div class="input-bordered input flex w-auto flex-row gap-2 p-0">
      <div class="my-auto w-1/4 min-w-max text-center">
        <p>{{ t("Compras") }}</p>
      </div>
      <div class="mx-2 border-l border-r border-gray-400 text-center">
        <select
          class="select min-h-8 h-10 rounded-none"
          @input="ordersOperatorChanged"
          :value="queryParams.orders_operator"
        >
          <option value="" disabled>{{ t("Seleccionar") }}</option>
          <option value="Igual a">{{ t("Igual a") }}</option>
          <option value="Distinto a">{{ t("Distinto a") }}</option>
          <option value="Menor a">{{ t("Menor a") }}</option>
          <option value="Menor o igual a">{{ t("Menor o igual a") }}</option>
          <option value="Mayor a">{{ t("Mayor a") }}</option>
          <option value="Mayor o igual a">{{ t("Mayor o igual a") }}</option>
        </select>
      </div>
      <div class="my-auto w-1/4 text-center">
        <input
          class="w-full appearance-none border-none bg-base-100 p-0"
          type="number"
          placeholder="Nº"
          @input="ordersChanged"
          :value="queryParams.orders"
          min="0"
        />
      </div>
    </div>
  </div>
  <!-- Limpiar filtros -->
  <div
    v-if="hasQueryParameters"
    class="form-control my-2 flex w-full flex-row items-center gap-2"
  >
    <div class="w-5/6"></div>
    <div class="w-1/6">
      <button
        class="btn btn-xs h-11 w-full justify-center gap-1"
        @click="clearFiltersParams"
      >
        <icon-component name="Trash" type="solid" classes="h-4 w-4 z-10" />
        {{ t("Limpiar filtros") }}
      </button>
    </div>
  </div>
  <!-- Tabla de Customers -->
  <div class="w-full">
    <table
      class="c-table-compact table w-full text-xs"
      :class="{ 'mt-2': !(checkedCustomers.length > 0 || maxSelect) }"
    >
      <thead class="w-full text-center">
        <tr>
          <th
            class="sticky left-0 z-10 min-w-[48px] bg-base-300"
            :class="{
              'rounded-none': checkedCustomers.length > 0 || maxSelect,
            }"
          >
            <input
              type="checkbox"
              v-model="checkAllPage"
              @click="selectPage()"
              class="checkbox bg-base-100"
              :disabled="
                checkedCustomers.length > 499 ||
                maxSelect
              "
            />
          </th>
          <th class="align-center bg-base-300">{{ t("Nombre") }}</th>
          <th class="align-center bg-base-300">{{ t("Email") }}</th>
          <th class="align-center bg-base-300">{{ t("Cant. compras") }}</th>
          <th class="align-center bg-base-300">{{ t("Total consumido") }}</th>
          <th class="align-center bg-base-300">{{ t("Ultima compra") }}</th>
        </tr>
      </thead>
      <tbody
        v-if="customers && customers.length > 0"
        class="w-full text-center"
      >
        <tr v-for="(customer, i) in customers" :key="i">
          <td :id="i + '_checkbox'" class="sticky left-0 z-10">
            <input
              v-model="customer.checked"
              @click="selectCustomer(customer)"
              type="checkbox"
              class="checkbox bg-base-100"
              :disabled="
                checkedCustomers.length > 499 ||
                maxSelect
              "
            />
          </td>
          <td
            class="font-semibold"
            :class="isDarkTheme ? 'lt-light' : 'lt-dark'"
          >
            <router-link :to="'/customers/' + customer.id"
              ><p class="w-56 overflow-hidden text-ellipsis whitespace-nowrap">
                {{ customer.name ? customer.name : t("[Sin nombre]") }}
              </p></router-link
            >
          </td>
          <td>
            <p class="w-56 overflow-hidden text-ellipsis whitespace-nowrap">
              {{ customer.email }}
            </p>
          </td>
          <td>
            {{ customer.cant_orders }}
          </td>
          <td>
            {{ customer.total_spent + " " + customer.total_spent_currency }}
          </td>
          <td
            class="font-semibold"
            :class="isDarkTheme ? 'lt-light' : 'lt-dark'"
          >
            <router-link
              v-if="customer.orders && customer.orders.length > 0"
              :to="'/orders/' + customer.orders[0].id"
              >{{ "#" + customer.orders[0].number }}</router-link
            >
          </td>
        </tr>
      </tbody>
      <tbody
        v-else-if="customers && customers.length == 0 && !loading"
        class="text-center"
      >
        <tr>
          <td colspan="9" class="text-lg">
            {{ t("¡Ups! No se encontraron clientes") }} ...
          </td>
        </tr>
      </tbody>
      <tbody v-else class="w-full text-center">
        <tr>
          <td class="p-0" colspan="9">
            <p class="w-full bg-base-200 py-2">{{ t("Cargando") }}...</p>
            <Skeletor class="shadow-xl drop-shadow-xl" height="770" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="customers.length" class="btn-group w-full justify-center">
    <template v-for="i in getPagesList(pagination)" :key="i">
      <router-link
        v-if="i === 0"
        class="btn"
        :class="{ 'btn-disabled bg-base-200': i === 0 }"
        to=""
      >
        <icon-component class="w-7" name="EllipsisHorizontal" type="solid" />
      </router-link>
      <router-link
        v-else
        class="btn"
        :class="{
          'btn-primary': i == pagination.current_page,
        }"
        @click="pageChanged(i)"
        :to="{
          path: '/customers',
          query: {
            page: i,
            limit: queryParams.limit,
          },
        }"
        >{{ i }}
      </router-link>
    </template>
  </div>
  <div class="modal" :class="{ 'modal-open': loading }">
    <button type="button" class="btn btn-outline loading">
      {{ t("Procesando") }}...
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import { useI18n } from "vue-i18n";
import { debounce } from "@/helpers.js";
import { Skeletor } from "vue-skeletor";
import { useLayout } from "@/stores/layout";

const auth = useAuth();
const layout = useLayout();
const route = useRoute();
const router = useRouter();
const store = computed(() => auth.store);
const { t } = useI18n();

const emit = defineEmits(["loaded"]);

// Computed
const isDarkTheme = computed(() => layout.currentTheme == "dark");
const hasQueryParameters = computed(() => {
  const { query } = route;
  return Object.keys(query).length > 0;
});

// Props

// Variables
const loading = ref(true);

const queryParams = ref({
  page: 1,
  limit: 20,
  search: "",
  category: "",
  orders: null,
  orders_operator: "",
  rule: "",
});

const checkedCustomers = ref([]);
const showCustomersMassiveActionModal = ref(false);
const checkAllPage = ref(false);
const maxSelect = ref(false);
const availableMaxSelect = ref(true);
const massiveActionSelected = ref("");
const customerCategories = ref([]);
const categoriesPagination = ref({
  total: 0,
  per_page: queryParams.value.page,
  current_page: queryParams.value.limit,
  last_page: 1,
  first_page: 1,
  first_page_url: "/?page=1",
  last_page_url: "/?page=1",
  next_page_url: null,
  previous_page_url: null,
});
const customers = ref([]);
const pagination = ref({
  total: 0,
  per_page: queryParams.value.page,
  current_page: queryParams.value.limit,
  last_page: 1,
  first_page: 1,
  first_page_url: "/?page=1",
  last_page_url: "/?page=1",
  next_page_url: null,
  previous_page_url: null,
});

function selectCustomer(customer) {
  const index = checkedCustomers.value.findIndex((c) => c.id === customer.id);
  if (index > -1) {
    checkedCustomers.value.splice(index, 1);
  } else {
    checkedCustomers.value.push(customer);
  }
}
function selectPage() {
  checkedCustomers.value = [];
  customers.value.forEach((c) => {
    c.checked = !checkAllPage.value;
    !checkAllPage.value && selectCustomer(c);
  });
}

const getCustomerCategories = async () => {
  axios
    .get("customer_categories", {
      params: {
        page: 1,
        limit: 20,
      },
    })
    .then((response) => {
      if (response.data.status) {
        categoriesPagination.value = response.data.customer_categories.meta;
        customerCategories.value = response.data.customer_categories.data;
      }

      return true;
    })
    .catch((error) => {
      console.log("Error exception fetching Customer Categories:", error);

      return false;
    });
};
const getCustomers = async () => {
  axios
    .get("customers", {
      params: {
        ...queryParams.value,
      },
    })
    .then((response) => {
      // console.log(response.data);
      if (response.data.status) {
        pagination.value = response.data.customers.meta;
        customers.value = response.data.customers.data.map((o) => {
          return {
            ...o,
            checked: false,
          };
        });
        emit("loaded");
      }
      loading.value = false;

      return true;
    })
    .catch((error) => {
      console.log(error);

      loading.value = false;

      return false;
    });
};

// --- FILTERS ---

const changeFilterStatus = () => {
  getCustomers();
  router.push({
    path: "/customers",
    query: queryParams.value,
  });
};
const debouncedFilterStatus = debounce(changeFilterStatus, 1000, false);

const debouncedChangePage = debounce(changeFilterStatus, 1000, false);
const pageChanged = (page = 1) => {
  loading.value = true;
  queryParams.value.page = page;
  debouncedChangePage();
};

const debouncedChangeOrdersOperator = debounce(changeFilterStatus, 1000, false);
const ordersOperatorChanged = (ordersOperatorEvent) => {
  queryParams.value.orders_operator = ordersOperatorEvent.target?.value;
  if (queryParams.value.orders !== null) {
    loading.value = true;
    debouncedChangeOrdersOperator();
  }
};

const debouncedChangeOrders = debounce(changeFilterStatus, 1000, false);
const ordersChanged = (ordersEvent) => {
  queryParams.value.orders = ordersEvent.target?.value
    ? Number(ordersEvent.target?.value)
    : null;
  if (queryParams.value.orders_operator !== "") {
    loading.value = true;
    debouncedChangeOrders();
  }
};

const clearFiltersParams = () => {
  loading.value = true;
  router.push({ path: route.path });
  queryParams.value.page = 1;
  queryParams.value.limit = 20;
  queryParams.value.search = "";
  queryParams.value.category = "All";
  queryParams.value.orders = null;
  queryParams.value.orders_operator = "";
  queryParams.value.rule = "";
  getCustomers();
};

onMounted(async () => {
  queryParams.value.page = route.query.page || 1;
  queryParams.value.limit = route.query.limit || 20;
  queryParams.value.search = route.query.search || "";
  queryParams.value.category = route.query.category || "All";
  queryParams.value.orders = route.query.orders || null;
  queryParams.value.orders_operator = route.query.orders_operator || "";
  queryParams.value.rule = route.query.rule || "All";
  try {
    await getCustomerCategories();
    await getCustomers();
  } catch (error) {
    console.log("Error fetching Customers and/or Categories", error);
  }
});
</script>
