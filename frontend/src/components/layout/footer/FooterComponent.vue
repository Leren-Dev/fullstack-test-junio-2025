<template>
  <footer :class="classes">Footer component</footer>
</template>

<script setup>
// Imports
import { onMounted, toRefs } from "vue";

// Props
const props = defineProps(["classes"]);

// Variables
const { classes } = toRefs(props);

// Computed

// Methods

// Lifecycle hooks
onMounted(() => {});
</script>
