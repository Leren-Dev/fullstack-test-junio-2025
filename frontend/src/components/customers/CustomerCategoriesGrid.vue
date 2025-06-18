<template>
  <div class="max-w-full overflow-x-auto px-1 md:px-2">
    <!-- Filtros sobre Tabla de Customers -->
    <div class="form-control flex w-full flex-row gap-2">
      <div class="w-6/12">
        <div class="input-bordered input flex flex-row p-0">
          <div class="w-1/12">
            <icon-component
              class="mx-auto h-full w-7"
              name="MagnifyingGlass"
              type="solid"
            />
          </div>
          <input
            v-model.trim="queryParams.search"
            class="rounded-box w-11/12 border-none bg-base-100"
            type="text"
            :placeholder="t('Categoría')"
            @input="debouncedFilterStatus"
          />
        </div>
      </div>
      <!-- Limpiar filtros -->
      <div
        v-if="hasQueryParameters"
        class="form-control flex w-3/12 flex-row items-center gap-2"
      >
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
    <div class="mt-2 w-full">
      <table class="c-table-compact table w-full text-xs">
        <thead class="w-full text-center">
          <tr>
            <th class="sticky left-0 z-10 min-w-[48px] bg-base-300">
              <input type="checkbox" class="checkbox bg-base-100" />
            </th>
            <th class="align-center bg-base-300">{{ t("Nombre") }}</th>
            <th class="align-center bg-base-300">{{ t("Cant. clientes") }}</th>
            <th class="align-center bg-base-300">{{ t("En reglas") }}</th>
            <th class="align-center bg-base-300">{{ t("Creada") }}</th>
            <th class="align-center bg-base-300">
              <button
                class="btn btn-accent btn-xs min-w-[120px] items-center justify-center"
                @click="showCreateModal = true"
              >
                <icon-component name="Plus" type="solid" class="mr-1 w-4" />{{
                  t("Añadir nueva categoría")
                }}
              </button>
            </th>
          </tr>
        </thead>
        <tbody
          v-if="customerCategories && customerCategories.length > 0"
          class="w-full text-center"
        >
          <tr
            class="text-sm"
            v-for="(category, i) in customerCategories"
            :key="i"
          >
            <td :id="i + '_checkbox'" class="sticky left-0 z-10">
              <input
                v-model="category.checked"
                type="checkbox"
                class="checkbox bg-base-100"
              />
            </td>
            <td
              class="font-semibold"
              :class="isDarkTheme ? 'lt-light' : 'lt-dark'"
            >
              <p class="overflow-hidden text-ellipsis whitespace-nowrap">
                {{ category.name ? category.name : t("[Sin nombre]") }}
              </p>
            </td>
            <td>
              <div
                class="tooltip-hover tooltip-top tooltip"
                data-tip="Ver clientes"
              >
                <router-link :to="'/customers?category=' + category.id">
                  <span class="font-bold hover:cursor-pointer">
                    {{ category.customers_count }}
                  </span>
                </router-link>
              </div>
              <span class="ml-1 text-xs">
                ({{
                  (
                    (category.customers_count / store.customers_count) *
                    100
                  ).toFixed(2)
                }}% {{ t("del total") }})
              </span>
            </td>
            <td>
              {{ category.rules_count }}
            </td>
            <td>
              {{ new Date(category.created_at).toLocaleDateString() }}
            </td>
            <td>
              <button
                class="btn btn-outline btn-error btn-xs min-w-[120px] justify-center"
                @click="handleDeleteCategory(category)"
              >
                <icon-component
                  name="Trash"
                  type="outline"
                  class="mr-1 w-4"
                />{{ t("Eliminar") }}
              </button>
            </td>
          </tr>
        </tbody>
        <tbody
          v-else-if="
            customerCategories && customerCategories.length == 0 && !loading
          "
          class="text-center"
        >
          <tr>
            <td colspan="9" class="text-lg">
              {{ t("¡Ups! No se encontraron categorías") }} ...
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
    <div
      v-if="getPagesList(pagination).length > 1"
      class="btn-group w-full justify-center"
    >
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
            path: '/customer-categories',
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

    <!-- Confirm Delete Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="w-full max-w-md rounded-lg border border-[#CB0000] border-opacity-40 bg-base-100 p-8 text-center shadow-lg"
      >
        <h3 class="text-2xl font-semibold">
          {{ t("Eliminar categoría") }}
        </h3>
        <p class="my-2 text-xl text-accent">{{ categoryToDelete?.name }}</p>
        <p class="mb-4">
          {{
            t(
              "¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer"
            )
          }}.
        </p>
        <div class="flex justify-center space-x-4">
          <button
            @click="deleteCategory(categoryToDelete)"
            class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            <p v-if="!loading">Eliminar</p>
            <icon-component
              v-if="loading"
              class="my-0 mx-auto w-7"
              name="ArrowPath"
              type="solid"
              :class="'animate-spin'"
            />
          </button>
          <button
            @click="showDeleteModal = false"
            class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            {{ t("Cancelar") }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <customer-category-create-modal
    v-if="showCreateModal"
    :loading="loading"
    :show="showCreateModal"
    @hide="showCreateModal = false"
    @save="handleSaveFromCreateModal"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import { useLogger } from "@/stores/logger";
import { useI18n } from "vue-i18n";
import { debounce } from "@/helpers.js";
import { Skeletor } from "vue-skeletor";
import { useLayout } from "@/stores/layout";
import { notify } from "notiwind";
import CustomerCategoryCreateModal from "./CustomerCategoryCreateModal.vue";

const auth = useAuth();
const layout = useLayout();
const route = useRoute();
const router = useRouter();
const store = computed(() => auth.store);
const logger = useLogger();
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
const loading = ref(false);
const queryParams = ref({
  page: 1,
  limit: 20,
  search: "",
  rule: "",
});

const customerCategories = ref([]);
const showCreateModal = ref(false);
const showDeleteModal = ref(false);
const categoryToDelete = ref(false);
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

const getCustomerCategories = async () => {
  loading.value = true;
  axios
    .get("customer_categories", {
      params: {
        ...queryParams.value,
        include_rules: true,
        include_customers: true,
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
  loading.value = false;
};
const handleSaveFromCreateModal = async (data) => {
  loading.value = true;
  try {
    const response = await axios.post("customer_categories", data);
    if (response && response.data && response.data.status) {
      await getCustomerCategories();
      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: t("¡Nueva categoría de cliente creada con éxito!"),
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
          text: t("Ocurrió un error al intentar crear la categoría de cliente"),
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
        text: t("Ocurrió un error al intentar crear la categoría de cliente"),
      },
      10000
    ); // 10s
  }
  loading.value = false;
  showCreateModal.value = false;
};
const handleDeleteCategory = (category) => {
  categoryToDelete.value = category;
  showDeleteModal.value = true;
};
const deleteCategory = async (category) => {
  loading.value = true;
  try {
    const response = await axios.delete("customer_categories/" + category.id);

    if (response && response.data && response.data.status) {
      getCustomerCategories();
      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: t("Categoría de cliente eliminada con éxito."),
        },
        4000
      ); // 4s
    } else {
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: t("Error al eliminar categoría de cliente"),
        },
        4000
      ); // 4s
    }
  } catch (error) {
    logger.log("Error deleting customer category");
    notify(
      {
        group: "bottom-right",
        type: "error",
        title: "Error",
        text: t(
          "Ocurrió un error al intentar eliminar la categoría de cliente de la tienda."
        ),
      },
      10000
    ); // 10s

    return false;
  }
  showDeleteModal.value = false;
  loading.value = false;
};

// --- FILTERS ---

const changeFilterStatus = () => {
  getCustomerCategories();
  router.push({
    path: "/customer-categories",
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

const clearFiltersParams = () => {
  loading.value = true;
  router.push({ path: route.path });
  queryParams.value.page = 1;
  queryParams.value.limit = 20;
  queryParams.value.search = "";
  queryParams.value.rule = "All";
  getCustomerCategories();
};

// --- FILTERS ---

onMounted(async () => {
  queryParams.value.page = route.query.page || 1;
  queryParams.value.limit = route.query.limit || 20;
  queryParams.value.search = route.query.search || "";
  queryParams.value.rule = route.query.rule || "All";
  try {
    await getCustomerCategories();
  } catch (error) {
    console.log("Error fetching Categories", error);
  }
});
</script>
