<template>
  <notification-component />
  <div class="hidden lg:flex">
    <sidebar-component v-if="loginStatus && isSidebarVisible" />
    <div
      class="w-full flex-col flex-wrap"
      :class="
        loginStatus && isSidebarOpen
          ? 'lg:max-w-[calc(100%-224px)] xl:max-w-[calc(100%-224px)]'
          : 'max-w-[calc(100%-48px)]'
      "
    >
      <router-view />
    </div>
  </div>
  <div class="flex lg:hidden"><under-construction-mobile /></div>
  <modal-component />
  <reload-prompt />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuth } from "./stores/auth";
import { useLayout } from "./stores/layout";
import SidebarComponent from "./components/layout/sidebar/SidebarComponent.vue";
import ModalComponent from "./components/layout/modal/ModalComponent.vue";
import ReloadPrompt from "./components/prompts/ReloadPrompt.vue";
import NotificationComponent from "./components/notifications/NotificationComponent.vue";
import UnderConstructionMobile from "./components/errors/UnderConstructionMobile.vue";
import axios from "axios";

// Variables
const auth = useAuth();
const layout = useLayout();
const storeDisabled = ref(false);

// Computed
const loginStatus = computed(() => auth.loginStatus);
const isSidebarVisible = computed(() => layout.isSidebarVisible);
const isSidebarOpen = computed(() => layout.isSidebarOpen);

// Methods

// Watchers

// Lifecycle hooks
onMounted(async () => {
  // Get current theme
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "dark");
  } else {
    layout.setCurrentTheme(theme);
  }

  if (loginStatus.value) {
    const storeResponse = await axios.get("stores/current");
    if (storeResponse.data.status) {
      // Get current lang
      const lang = localStorage.getItem("lang");
      if (!lang) {
        localStorage.setItem("lang", storeResponse.data.store.main_language);
        layout.setCurrentLang(storeResponse.data.store.main_language);
      } else {
        layout.setCurrentLang(lang);
      }
      auth.setStore(storeResponse.data.store);
      layout.setStoreName(
        storeResponse.data.store.names[lang] ||
          storeResponse.data.store.names["es"] ||
          storeResponse.data.store.names["pt"] ||
          storeResponse.data.store.names["en"]
      );
      storeDisabled.value = storeResponse.data.store.status == "Disabled";
    }
  }
});
</script>
