<template>
  <div>
    <header-component v-if="isHeaderVisible" />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from "@/components/layout/header/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
    // FooterComponent,
  },
};
</script>

<script setup>
// Imports
import { computed, onMounted } from "vue";
import { useLayout } from "@/stores/layout";

const layout = useLayout();
const isHeaderVisible = computed(() => layout.isHeaderVisible);

// Lifecycle hooks
onMounted(() => {});
</script>
