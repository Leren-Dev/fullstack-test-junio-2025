<template>
  <div>
    <!-- Filtros sobre Tabla de Cucardas -->
    <div class="form-control flex w-full flex-row gap-2">
      <div class="w-1/4">
        <div class="input-bordered input flex flex-row p-0">
          <div class="w-3/12">
            <icon-component
              class="mx-auto h-full w-5"
              name="MagnifyingGlass"
              type="solid"
            />
          </div>
          <input
            :value="queryParams.search"
            @input="event => searchChanged(event.target.value)"
            class="rounded-box w-11/12 border-none bg-base-100"
            type="text"
            :placeholder="t('Filtrar cucardas')"
          />
        </div>
      </div>
      <div class="w-1/4">
        <select
          :value="queryParams.type"
          @input="event => typeChanged(event.target.value)"
          class="select-bordered select w-full"
        >
          <option value="All">{{ t("Todos los tipos") }}</option>
          <option value="text">{{ t("Texto") }}</option>
        </select>
      </div>
      <div class="w-1/4">
        <select
          :value="queryParams.status"
          @input="event => statusChanged(event.target.value)"
          class="select-bordered select w-full"
        >
          <option value="All">{{ t("Todos los estados") }}</option>
          <option value="active">{{ t("Activas") }}</option>
          <option value="inactive">{{ t("Inactivas") }}</option>
        </select>
      </div>
      <div class="w-1/4">
        <select
          :value="queryParams.show_at"
          @input="event => showAtChanged(event.target.value)"
          class="select-bordered select w-full"
        >
          <option value="All">{{ t("Todas las vistas") }}</option>
          <option value="pdp">{{ t("Página del Producto") }}</option>
          <option value="grids">{{ t("Grillas de Productos") }}</option>
        </select>
      </div>
    </div>

    <!-- Filtros por biblioteca -->
    <div class="w-full my-2 flex gap-2">
      <button
        type="button"
        class="btn btn-accent"
        :class="{ 'btn-outline': queryParams.library !== 'Mis cucardas' }"
        @click="libraryChanged('Mis cucardas')"
      >
        {{ t("Mis cucardas") }}
      </button>
      <button
        type="button"
        class="btn btn-accent"
        :class="{ 'btn-outline': queryParams.library !== 'Plantillas' }"
        @click="libraryChanged('Plantillas')"
      >
        {{ t("Plantillas") }}
      </button>
    </div>
    
    <!-- Tabla de Cucardas -->
    <div class="w-full">
      <table class="c-table-compact table w-full text-xs">
        <thead class="w-full text-center">
          <tr>
            <th class="h-10 bg-base-300">{{ t("Nombre") }}</th>
            <th class="h-10 bg-base-300">
              {{ t("Asociados") }}
            </th>
            <th class="h-10 bg-base-300">{{ t("Vista previa") }}</th>
            <th class="h-10 bg-base-300">{{ t("Ubicación") }}</th>
            <th class="h-10 bg-base-300">{{ t("Tipo") }}</th>
            <th class="h-10 bg-base-300">{{ t("Estado") }}</th>
            <th class="h-10 bg-base-300">
              <div class="flex justify-center items-center gap-2">
                <button
                  type="button"
                  class="btn-accent btn-sm btn min-w-[120px] items-center justify-center"
                  @click="showCreateLabelModal = true"
                >
                  <icon-component name="Plus" type="solid" class="mr-1 w-4" />
                  {{ t("Crear nueva cucarda") }}
                </button>
                <a href="https://docs.lerentools.com/cucardas-personalizadas-nueva-app" target="_blank" rel="noopener noreferrer" class="h-5 w-5">
                  <div
                    class="tooltip tooltip-hover tooltip-right"
                    :data-tip="t('Ayuda')"
                  >
                    <icon-component
                      name="QuestionMarkCircle"
                      type="solid"
                      classes="h-5 w-5"
                    />
                  </div>
                </a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          v-if="labels && labels.length > 0"
          class="w-full text-center"
        >
          <tr v-for="l in labels" :key="l.id" class="h-28 max-h-28">
            <!-- Nombre -->
            <td :id="l.id + '_name'">
              <b class="w-56 overflow-hidden text-ellipsis whitespace-nowrap">{{
                l.name
              }}</b>
            </td>
            <!-- Asociados -->
            <td>{{ !l.is_leren && l.products_count >= 0 ? l.products_count : '-' }}</td>
            <!-- Vista previa -->
            <td :id="l.id + '_preview'">
              <div
                class="w-max max-w-xs p-2 whitespace-normal flex justify-center items-center m-auto rounded-lg"
                :style="{ color: l.text_color, backgroundColor: l.background_color }"
              >{{ l.description }}</div>
            </td>
            <!-- Ubicación -->
            <td :id="l.id + '_show_at'">
              <p class="m-auto w-36 whitespace-normal">{{ l.show_at_pdp && l.show_at_grids ? t('Página del Producto y Grillas de Productos') : (l.show_at_pdp ? t('Página del Producto') : (l.show_at_grids ? t('Grillas de Productos') : '-')) }}</p>
            </td>
            <!-- Tipo -->
            <td :id="l.id + '_type'">
              <p>{{ t(l.type) }}</p>
            </td>
            <!-- Estado -->
            <td :id="l.id + '_status'">
              <p>{{ l.enabled ? t('Activa') : t('Inactiva') }}</p>
            </td>
            <!-- Acciones -->
            <td :id="l.id + '_actions'">
              <div class="flex justify-center gap-2 items-center">
                <button
                  type="button"
                  v-if="!l.is_leren && !l.enabled"
                  class="btn-outline btn-primary btn-xs btn min-w-[120px] justify-center"
                  @click="handleActivateLabel(l)"
                >
                  <icon-component
                    name="Power"
                    type="outline"
                    class="mr-1 w-4"
                  />{{ t("Activar") }}
                </button>
                <button
                  type="button"
                  v-else-if="!l.is_leren"
                  class="btn-outline btn-warning btn-xs btn min-w-[120px] justify-center"
                  @click="handleDeactivateLabel(l)"
                >
                  <icon-component
                    name="Power"
                    type="outline"
                    class="mr-1 w-4"
                  />{{ t("Desactivar") }}
                </button>
                <button
                  type="button"
                  class="btn btn-ghost btn-xs"
                  :title="t('Ver')"
                  @click="handleShowViewLabelModal(l)"
                >
                  <icon-component
                    name="Eye"
                    type="solid"
                    classes="h-5 w-5"
                  />
                </button>
                <button
                  type="button"
                  v-if="l.is_leren !== 1"
                  class="btn btn-ghost btn-xs"
                  :title="t('Editar')"
                  @click="handleShowEditLabelModal(l)"
                >
                  <icon-component
                    name="Pencil"
                    type="solid"
                    classes="h-5 w-5 text-accent"
                  />
                </button>
                <button
                  v-if="l.is_leren"
                  type="button"
                  class="btn btn-outline btn-accent btn-xs"
                  :title="t('Usar')"
                  @click="handleShowDuplicateLabelModal(l)"
                >
                  Usar plantilla
                </button>
                <button
                  v-else
                  type="button"
                  class="btn btn-ghost btn-xs"
                  :title="t('Duplicar')"
                  @click="handleShowDuplicateLabelModal(l)"
                >
                  <icon-component
                    name="DocumentDuplicate"
                    type="solid"
                    classes="h-5 w-5 text-accent"
                  />
                </button>
                <button
                  type="button"
                  class="btn btn-ghost btn-xs"
                  v-if="!l.is_leren"
                  :title="t('Eliminar')"
                  @click="handleShowDeleteLabelModal(l)"
                >
                  <icon-component
                    name="Trash"
                    type="solid"
                    :classes="'h-5 w-5' + (!l.is_leren ? ' text-error' : '')"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody
          v-else-if="labels && labels.length == 0 && !loading"
          class="text-center"
        >
          <tr>
            <td colspan="12" class="text-lg">{{ msg }}</td>
          </tr>
        </tbody>
        <tbody v-else class="w-full text-center">
          <tr>
            <td class="p-0" colspan="12">
              <p class="w-full bg-base-200 py-2">{{ t("Cargando") }}...</p>
              <Skeletor class="shadow-xl drop-shadow-xl" height="740" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="labels.length" class="btn-group w-full justify-center">
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
            path: '/labels',
            query: queryParams,
          }"
          >{{ i }}
        </router-link>
      </template>
      <div class="modal" :class="{ 'modal-open': loading }">
        <button type="button" class="btn btn-outline loading">
          {{ t("Procesando") }} ...
        </button>
      </div>
    </div>

    <label-create-modal
      v-if="showCreateLabelModal"
      :show="showCreateLabelModal"
      @hide="handleHideModals"
      @save="handleCreateLabel"
    />
    <label-edit-modal
      v-if="showEditLabelModal"
      :label="labelItemEdit"
      :show="showEditLabelModal"
      :readOnly="readOnlyEditLabelModal"
      :isClone="isCloneEditLabelModal"
      @hide="handleHideModals"
      @save="handleEditLabel"
    />
    <label-delete-modal
      v-if="showDeleteLabelModal"
      :label="labelItemDelete"
      :show="showDeleteLabelModal"
      @hide="handleHideModals"
      @confirm="handleDeleteLabel"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "@/helpers.js";
import { useLogger } from "@/stores/logger";
import { notify } from "notiwind";
import { Skeletor } from "vue-skeletor";
import { useI18n } from "vue-i18n";
import LabelCreateModal from "../labels/LabelCreateModal.vue";
import LabelEditModal from "../labels/LabelEditModal.vue";
import LabelDeleteModal from "../labels/LabelDeleteModal.vue";

const { t } = useI18n();

const logger = useLogger();

const route = useRoute();
const router = useRouter();

const store = ref({});
const storeConfigs = ref({});

const loading = ref(true);
const msg = ref("");

const queryParams = ref({
  page: 1,
  limit: 10,
  search: "",
  type: "All",
  status: "All",
  show_at: "All",
  library: "Mis cucardas",
});

const labels = ref([]);
const showCreateLabelModal = ref(false);
const showDeleteLabelModal = ref(false);
const labelItemDelete = ref({});
const showEditLabelModal = ref(false);
const readOnlyEditLabelModal = ref(false);
const isCloneEditLabelModal = ref(false);
const labelItemEdit = ref({});

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

const getStore = async () => {
  try {
    const response = await axios.get("stores/current");
    if (response && response.data && response.data.status) {
      // console.log("Current Store:", response.data);
      store.value = response.data.store;

      // Transformo los datos de array de configuraciones en un objeto con sus properties
      for (const config of response.data.store?.configs) {
        for (const c of config.values) {
          storeConfigs.value[c.name] = {
            ...c,
            store_config_type: config.type,
          };
        }
      }
    }
  } catch (error) {
    logger.log("Error obteniendo current Store:", error);
  }
};

const handleHideModals = () => {
  showCreateLabelModal.value = false;
  showDeleteLabelModal.value = false;
  labelItemDelete.value = {};
  showEditLabelModal.value = false;
  labelItemEdit.value = {};
  readOnlyEditLabelModal.value = false;
  isCloneEditLabelModal.value = false;
  loading.value = false;
};

const getLabels = async () => {
  // Limpio queryParams innecesarios (vacios o default)
  const cleanQueryParams = { ...queryParams.value };
  if (!cleanQueryParams.page || cleanQueryParams.page ===  1) delete cleanQueryParams.page;
  if (!cleanQueryParams.limit || cleanQueryParams.limit === 10) delete cleanQueryParams.limit;
  if (!cleanQueryParams.search || cleanQueryParams.search === "") delete cleanQueryParams.search;
  if (!cleanQueryParams.type || cleanQueryParams.type === "All") delete cleanQueryParams.type;
  if (!cleanQueryParams.status || cleanQueryParams.status === "All") delete cleanQueryParams.status;
  if (!cleanQueryParams.show_at || cleanQueryParams.show_at === "All") delete cleanQueryParams.show_at;
  if (!cleanQueryParams.library || cleanQueryParams.library === "Mis cucardas") delete cleanQueryParams.library;
  router.push({
    path: "/labels",
    query: cleanQueryParams,
  });

  msg.value = "";
  axios
    .get("labels", {
      params: queryParams.value,
    })
    .then((response) => {
      logger.log(response.data);
      if (response.data.status) {
        msg.value = response.data.details;
        pagination.value = response.data.labels.meta;
        labels.value = response.data.labels.data;
      }

      loading.value = false;
    })
    .catch((error) => {
      console.log(error);

      loading.value = false;
    });
};

const handleCreateLabel = async (data) => {
  // POST: creo la cucarda + mensaje de confirmación
  try {
    const createLabelResponse = await axios.post("labels", data);

    if (
      createLabelResponse &&
      createLabelResponse.data &&
      createLabelResponse.data.status
    ) {
      await getLabels();
      handleHideModals();

      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: t("¡Cucarda creada con éxito!"),
        },
        4000
      ); // 4s
    } else {
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: t("Ocurrió un error inesperado al intentar crear la cucarda."),
        },
        10000
      ); // 10s
    }
  } catch (error) {
    notify(
      {
        group: "bottom-right",
        type: "error",
        title: "Error",
        text: t("Ocurrió un error inesperado al intentar crear la cucarda."),
      },
      10000
    ); // 10s
  }
};
const handleShowDeleteLabelModal = (label) => {
  if (label && label.id) {
    labelItemDelete.value = { value: label.id, label: label.name };
    showDeleteLabelModal.value = true;
  }
};
const handleDeleteLabel = async () => {
  if (labelItemDelete.value.value) {
    // DELETE: borro la cucarda con ID labelItemDelete.value.value + mensaje de confirmación
    try {
      const deleteLabelResponse = await axios.delete(
        "labels/" + labelItemDelete.value.value
      );

      if (
        deleteLabelResponse &&
        deleteLabelResponse.data &&
        deleteLabelResponse.data.status
      ) {
        await getLabels();
        handleHideModals();

        notify(
          {
            group: "bottom-right",
            type: "success",
            title: "Success",
            text: t("¡Cucarda eliminada con éxito!"),
          },
          4000
        ); // 4s
      } else {
        notify(
          {
            group: "bottom-right",
            type: "error",
            title: "Error",
            text: t(
              "Ocurrió un error inesperado al intentar eliminar la cucarda seleccionada."
            ),
          },
          10000
        ); // 10s
      }
    } catch (error) {
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: t(
            "Ocurrió un error inesperado al intentar eliminar la cucarda seleccionada."
          ),
        },
        10000
      ); // 10s
    }
  }
};
const handleActivateLabel = async (label) => {
  loading.value = true;
  // console.log("Activating Custom Label:", label)
  try {
    const data = {
      enabled: true,
    };
    const activateResponse = await axios.put(
      "labels/" + label.id + "/status",
      data
    );
    if (
      activateResponse &&
      activateResponse.data &&
      activateResponse.data.status
    ) {
      await getLabels();
      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: "¡Cucarda activada con éxito!",
        },
        4000
      ); // 4s
    } else {
      console.log("Error while activating Custom Label");
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: "Ocurrió un error al intentar activar la Cucarda seleccionada",
        },
        10000
      ); // 10s
    }
  } catch (error) {
    console.log("Error exception while activating Custom Label:", error);
    notify(
      {
        group: "bottom-right",
        type: "error",
        title: "Error",
        text: "Ocurrió un error al intentar activar la Cucarda seleccionada",
      },
      10000
    ); // 10s
  }
  loading.value = false;
};
const handleDeactivateLabel = async (label) => {
  loading.value = true;
  // console.log("Deactivating Custom Label:", label)
  try {
    const data = {
      enabled: false,
    };
    const activateResponse = await axios.put(
      "labels/" + label.id + "/status",
      data
    );
    if (
      activateResponse &&
      activateResponse.data &&
      activateResponse.data.status
    ) {
      await getLabels();
      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: t("¡Cucarda desactivada con éxito!"),
        },
        4000
      ); // 4s
    } else {
      console.log("Error while deactivating Custom Label");
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: t(
            "Ocurrió un error al intentar desactivar la Cucarda seleccionada"
          ),
        },
        10000
      ); // 10s
    }
  } catch (error) {
    console.log("Error exception while deactivating Custom Label:", error);
    notify(
      {
        group: "bottom-right",
        type: "error",
        title: "Error",
        text: t(
          "Ocurrió un error al intentar desactivar la Cucarda seleccionada"
        ),
      },
      10000
    ); // 10s
  }
  loading.value = false;
};
const handleShowViewLabelModal = (label) => {
  if (label && label.id) {
    readOnlyEditLabelModal.value = true;
    labelItemEdit.value = { ...label };
    showEditLabelModal.value = true;
  }
};
const handleShowDuplicateLabelModal = (label) => {
  if (label && label.id) {
    readOnlyEditLabelModal.value = false;
    isCloneEditLabelModal.value = true;
    labelItemEdit.value = { ...label };
    showEditLabelModal.value = true;
  }
};
const handleShowEditLabelModal = (label) => {
  if (label && label.id) {
    readOnlyEditLabelModal.value = false;
    isCloneEditLabelModal.value = false;
    labelItemEdit.value = { ...label };
    showEditLabelModal.value = true;
  }
};
const handleEditLabel = async (data) => {
  // PUT: actualizo la cucarda + mensaje de confirmación
  try {
    let updateLabelResponse = {};
    if (data.id) updateLabelResponse = await axios.put("labels/" + data.id, data);
    else updateLabelResponse = await axios.post("labels", data);

    if (
      updateLabelResponse &&
      updateLabelResponse.data &&
      updateLabelResponse.data.status
    ) {
      await getLabels();
      handleHideModals();

      notify(
        {
          group: "bottom-right",
          type: "success",
          title: "Success",
          text: t("¡Cucarda actualizada con éxito!"),
        },
        4000
      ); // 4s
    } else {
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: t("Ocurrió un error inesperado al intentar actualizar la cucarda."),
        },
        10000
      ); // 10s
    }
  } catch (error) {
    notify(
      {
        group: "bottom-right",
        type: "error",
        title: "Error",
        text: t("Ocurrió un error inesperado al intentar actualizar la cucarda."),
      },
      10000
    ); // 10s
  }
};

// --- FILTERS ---

// Search
const changeFilterSearch = () => {
  getLabels();
}
const debouncedChangeFilterSearch = debounce(changeFilterSearch, 1000, false);
const searchChanged = (search = "") => {
  loading.value = true;
  queryParams.value.search = search;
  debouncedChangeFilterSearch();
}
// Type
const changeFilterType = () => {
  getLabels();
}
const debouncedChangeFilterType = debounce(changeFilterType, 1000, false);
const typeChanged = (type = "All") => {
  loading.value = true;
  queryParams.value.type = type;
  debouncedChangeFilterType();
}
// Status
const changeFilterStatus = () => {
  getLabels();
}
const debouncedChangeFilterStatus = debounce(changeFilterStatus, 1000, false);
const statusChanged = (status = "All") => {
  loading.value = true;
  queryParams.value.status = status;
  debouncedChangeFilterStatus();
}
// Show At
const changeFilterShowAt = () => {
  getLabels();
}
const debouncedChangeFilterShowAt = debounce(changeFilterShowAt, 1000, false);
const showAtChanged = (showAt = "All") => {
  loading.value = true;
  queryParams.value.show_at = showAt;
  debouncedChangeFilterShowAt();
}
// Library
const changeFilterLibrary = () => {
  getLabels();
}
const debouncedChangeFilterLibrary = debounce(changeFilterLibrary, 1000, false);
const libraryChanged = (library = "Mis cucardas") => {
  loading.value = true;
  queryParams.value.library = library;
  debouncedChangeFilterLibrary();
}

// Page
const changePage = () => {
  getLabels();
};
const debouncedChangePage = debounce(changePage, 1000, false);
const pageChanged = (page = 1) => {
  loading.value = true;
  queryParams.value.page = page;
  debouncedChangePage();
};

// --- LIFECYCLE HOOKS ---
onMounted(async () => {
  await getStore();

  queryParams.value.page = route.query.page || 1;
  queryParams.value.limit = route.query.limit || 10;
  queryParams.value.search = route.query.search || "";
  queryParams.value.type = route.query.type || "All";
  queryParams.value.status = route.query.status || "All";
  queryParams.value.show_at = route.query.show_at || "All";
  queryParams.value.library = route.query.library || "Mis cucardas";

  getLabels();
});
</script>
