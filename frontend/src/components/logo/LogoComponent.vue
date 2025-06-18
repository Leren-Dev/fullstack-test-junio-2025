<template>
  <div :class="divClasses">
    <img
      v-if="iso"
      src="/isologo.png"
      :width="imgWidth"
      :height="imgHeight"
      :alt="imgAlt"
      :class="imgClasses"
      :style="{
        'max-width': imgWidth + 'px',
        'max-height': imgHeight + 'px',
        'aspect-ratio': '1',
      }"
    />
    <img
      v-else
      :src="currentTheme == 'dark' ? '/logo-white.png' : '/logo.png'"
      :width="imgWidth"
      :height="imgHeight"
      :alt="imgAlt"
      :class="imgClasses + ' pl-0'"
      :style="{
        'max-width': imgWidth + 'px',
        'max-height': imgHeight + 'px',
      }"
    />
  </div>
</template>

<script setup>
// Imports
import { onMounted, toRefs, computed } from "vue";
import { useLayout } from "@/stores/layout";

// Props
const props = defineProps([
  "iso",
  "imgWidth",
  "imgHeight",
  "imgAlt",
  "imgClasses",
  "divClasses",
]);

// Variables
const { iso, imgWidth, imgHeight, imgAlt, imgClasses, divClasses } =
  toRefs(props);
const layout = useLayout();

// Computed
const currentTheme = computed(() => layout.currentTheme);

// Methods

// Lifecycle hooks
onMounted(() => {});
</script>
