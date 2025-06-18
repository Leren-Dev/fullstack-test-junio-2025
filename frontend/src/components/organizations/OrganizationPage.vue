<template>
  <div class="w-full px-2 pb-4">
    <h2
      class="card mb-2 bg-base-300 p-2 text-center text-3xl shadow-lg drop-shadow-lg"
    >
      {{ t("Información sobre tu organización") }}
    </h2>
    <div class="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
      <!-- Store data -->
      <div class="h-min flex-1 rounded-lg bg-base-300 p-4 shadow-md">
        <div class="mb-4 flex justify-between">
          <h3 class="mb-2 text-3xl font-bold">{{ t("Tiendanube") }}</h3>
          <img :src="store.logo" alt="Store Logo" class="w-44 object-contain" />
        </div>
        <div v-if="loadingStore" class="space-y-6 rounded-md bg-base-100 p-4">
          <div v-for="index in 4" :key="index" class="rounded-lg shadow-sm">
            <Skeletor width="40%" />
            <Skeletor width="70%" />
          </div>
        </div>
        <div v-else class="space-y-2 rounded-md bg-base-100 p-4">
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Nombre de tiendanube") }}
            </p>
            <p class="text-xl">
              {{ store?.names ? store.names[storeLanguage] : "" }}
            </p>
          </div>
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Email de tiendanube") }}
            </p>
            <p class="text-xl">{{ store.email }}</p>
          </div>
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Dominio") }}
            </p>
            <p class="text-xl">{{ store.original_domain }}</p>
          </div>
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Template") }}
            </p>
            <p class="text-xl">{{ store.current_theme }}</p>
          </div>
        </div>
      </div>

      <!-- Organization data -->
      <div
        class="flex h-min flex-1 flex-col rounded-lg bg-base-300 p-4 shadow-md"
      >
        <h3 class="mb-6 text-3xl font-bold">{{ t("Organización") }}</h3>
        <div
          v-if="loadingOrganization"
          class="space-y-6 rounded-md bg-base-100 p-4"
        >
          <div v-for="index in 4" :key="index" class="rounded-lg shadow-sm">
            <Skeletor width="40%" />
            <Skeletor width="70%" />
          </div>
        </div>
        <div v-else class="mb-4 space-y-2 rounded-md bg-base-100 p-4">
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Nombre de organización") }}
            </p>
            <p class="text-xl">{{ organization.name }}</p>
          </div>
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Email de organización") }}
            </p>
            <p class="text-xl">{{ organization.email }}</p>
          </div>
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Usuarios") }}
            </p>
            <p class="text-xl">{{ organization.cant_users }}</p>
          </div>
          <div class="rounded-lg shadow-sm">
            <p class="text-base font-medium text-gray-600">
              {{ t("Tiendas") }}
            </p>
            <p class="text-xl">{{ organization.cant_stores }}</p>
          </div>
        </div>
        <div class="mt-auto">
          <div
            class="rounded-md border border-[#CB0000] border-opacity-40 bg-base-100 p-3 shadow-md"
          >
            <div
              @click="showConfirmModal = true"
              class="text-lg text-[#CB0000] hover:cursor-pointer hover:text-opacity-80"
            >
              {{ t("Eliminar cuenta") }}
            </div>
            <p>
              {{
                t(
                  "Sería una lástima que te fueras, pero podés hacerlo cuando lo desees"
                )
              }}.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="w-full max-w-md rounded-lg border border-[#CB0000] border-opacity-40 bg-base-100 p-8 text-center shadow-lg"
      >
        <h3
          class="mb-4 text-2xl font-semibold"
          :class="{ 'flex items-center justify-center gap-2': loading }"
        >
          {{ loading ? t("Eliminando cuenta") : t("Confirmar Eliminación") }}
          <icon-component
            v-if="loading"
            class="w-7"
            name="ArrowPath"
            type="solid"
            :class="'animate-spin'"
          />
        </h3>
        <p class="mb-4">
          {{
            loading
              ? t("Por favor, espera mientras eliminamos tu cuenta.")
              : t(
                  "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer. Esto también cancelará la suscripciones activas."
                )
          }}
        </p>
        <div class="flex justify-center space-x-4">
          <button
            @click="deleteAccount"
            class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            {{ t("Eliminar") }}
          </button>
          <button
            @click="showConfirmModal = false"
            class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            {{ t("Cancelar") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { notify } from "notiwind";
import { Skeletor } from "vue-skeletor";
import { useLayout } from "@/stores/layout";
import { useAuth } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const layout = useLayout();
const auth = useAuth();

const storeLanguage = computed(() => layout.storeLang);

const loadingOrganization = ref(true);
const loadingStore = ref(true);
const loading = ref(false);
const showConfirmModal = ref(false);
const organization = ref({});
const store = ref({});
const currentUser = ref({});

const getStoreConfig = async () => {
  try {
    const response = await axios.get("organizations/current");
    if (response && response.data && response.data.status) {
      organization.value = response.data.organization;
    }
  } catch (error) {
    console.log("Error obteniendo current Organization:", error);
  }
  loadingOrganization.value = false;

  try {
    const response = await axios.get("stores/current");
    if (response && response.data && response.data.status) {
      store.value = response.data.store;
      auth.setStore(response.data.store);
      layout.setStoreName(
        response.data.store.names[storeLanguage.value] ||
          response.data.store.names["es"] ||
          response.data.store.names["pt"] ||
          response.data.store.names["en"]
      );
    }
  } catch (error) {
    console.log("Error obteniendo current Store:", error);
  }
  loadingStore.value = false;
};

const getCurrentUser = async () => {
  try {
    const response = await axios.get("users/current");

    if (response && response.data && response.data.status) {
      currentUser.value = response.data.user;
    }
  } catch (error) {
    console.log("Error fetching current User", error);
  }
};

const deleteAccount = () => {
  loading.value = true;
  setTimeout(async () => {
    try {
      const response = await axios.delete("users/" + currentUser.value.id);

      if (response?.data?.status) {
        notify(
          {
            group: "bottom-right",
            type: "success",
            title: "Success",
            text: "¡Cuenta eliminada con éxito!",
          },
          4000
        ); // 4s
      }

      window.location.href = "/login";
    } catch (err) {
      notify(
        {
          group: "bottom-right",
          type: "error",
          title: "Error",
          text: "Ocurrió un error al intentar eliminar la cuenta",
        },
        4000
      ); // 4s
      console.log("Ocurrió un error al intentar eliminar la cuenta:", err);
    }

    showConfirmModal.value = false;
    loading.value = false;
  }, 2000);
};

// onMounted hook
onMounted(async () => {
  // Simulación de carga
  setTimeout(() => {
    loadingOrganization.value = false;
    loadingStore.value = false;
  }, 3000); // Retraso de 2 segundos antes de cargar los datos reales

  // Obtener los datos del store y sus aplicaciones instaladas
  getStoreConfig();
  getCurrentUser();
});
</script>
