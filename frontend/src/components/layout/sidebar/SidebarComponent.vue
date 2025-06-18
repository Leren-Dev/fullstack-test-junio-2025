<template>
  <div
    class="sidebar sticky inset-0 z-40 flex h-screen flex-col flex-wrap items-center rounded-tr-3xl rounded-br-[100px] bg-base-300 text-center shadow-xl drop-shadow-xl"
    :class="[
      layoutIsSidebarOpen ? 'w-56' : 'w-12',
      layoutIsSidebarOpen && layoutIsMobile ? 'absolute' : 'relative',
    ]"
  >
    <sidebar-top-component
      :layoutIsSidebarOpen="layoutIsSidebarOpen"
      @open-sidebar="openSidebar()"
      @close-sidebar="closeSidebar()"
    />
    <sidebar-content-component
      :layoutIsSidebarOpen="layoutIsSidebarOpen"
      @open-sidebar="openSidebar()"
      @close-sidebar="closeSidebar()"
    />
    <sidebar-bottom-component
      :layoutIsSidebarOpen="layoutIsSidebarOpen"
      @open-sidebar="openSidebar()"
      @close-sidebar="closeSidebar()"
    />
  </div>
</template>

<script setup>
// Imports
import { computed, onMounted } from "vue";
import { useLayout } from "@/stores/layout";
import SidebarTopComponent from "./SidebarTopComponent.vue";
import SidebarContentComponent from "./SidebarContentComponent.vue";
import SidebarBottomComponent from "./SidebarBottomComponent.vue";

const layout = useLayout();

// Computed
const layoutIsMobile = computed(() => layout.isMobile);
const layoutIsSidebarOpen = computed(() => layout.isSidebarOpen);

// Methods
const isMobile = () => {
  if (window.innerWidth < 768) return true;
  else if ("maxTouchPoints" in navigator)
    return navigator.maxTouchPoints > 0 ? true : false;
  else
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
};

const openSidebar = () => {
  layout.openSidebar();
};
const closeSidebar = () => {
  layout.closeSidebar();
};

// Lifecycle hooks
onMounted(() => {
  layout.setIsMobile(isMobile());
  window.addEventListener("resize", () => {
    layout.setIsMobile(isMobile());
  });
});
</script>
