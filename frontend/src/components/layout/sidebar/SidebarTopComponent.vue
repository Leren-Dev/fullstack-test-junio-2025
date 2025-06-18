<template>
  <div class="sidebar-top flex w-full items-center p-1 pb-0">
    <div class="logo flex">
      <button class="flex items-center">
        <logo-component
          :iso="!layoutIsSidebarOpen"
          :imgWidth="logoImgWidth"
          :imgHeight="logoImgHeight"
          :imgAlt="logoImgAlt"
          :imgClasses="logoImgClasses"
          :divClasses="logoDivClasses"
          @click="handleClick"
        />
      </button>
    </div>
    <button
      v-if="layoutIsSidebarOpen"
      class="absolute right-0 top-0"
      @click="$emit('close-sidebar')"
    >
      <icon-component name="XMark" type="solid" classes="w-8 mt-1 mr-1" />
    </button>
  </div>
</template>

<script setup>
import LogoComponent from "@/components/logo/LogoComponent.vue";
import { toRefs, ref } from "vue";

// Props
const props = defineProps(["layoutIsSidebarOpen"]);

// Variables
const { layoutIsSidebarOpen } = toRefs(props);
const emit = defineEmits(["close-sidebar", "open-sidebar"]);

// - Logo
const logoImgWidth = ref(layoutIsSidebarOpen ? "220" : "48");
const logoImgHeight = ref(layoutIsSidebarOpen ? "48" : "48");
const logoImgAlt = ref("Organization Logo");
const logoImgClasses = ref("w-full");
const logoDivClasses = ref("");

// - Click logo
const handleClick = () => {
  if (layoutIsSidebarOpen.value) {
    emit("close-sidebar");
  } else {
    emit("open-sidebar");
  }
};

// Computed
</script>

<style scoped>
.logo {
  min-height: 34px;
}
@media (min-width: 768px) {
  .logo {
    min-height: 48px;
  }
}
</style>
