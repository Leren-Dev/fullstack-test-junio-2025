<template>
  <component
    v-if="isLoaded"
    :is="getIcon()"
    :class="classes + (active ? ' active' : '')"
    :active="active"
    aria-hidden="true"
  />
</template>

<script setup>
// Imports
import { computed, inject, onMounted, ref, toRefs } from "vue";

// Props
const props = defineProps(["name", "classes", "type", "active"]);

// Variables
const isLoaded = ref(false);
const icons = inject("icons");
const { name, type, classes, active } = toRefs(props);

// Computed
const iconName = computed(() => type.value + name.value + "Icon");

// Methods
const getIcon = () => {
  return icons[iconName.value];
};

// Lifecycle hooks
onMounted(() => {
  isLoaded.value = true;
});
</script>
