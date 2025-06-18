<template>
  <div class="flex justify-center">
    <div
      class="radial-progress absolute ml-[1px] mt-[1px] text-gray-400"
      :class="backgroundClasses"
      :style="
        '--value:' +
        backgroundProgress +
        '; --size: ' +
        backgroundSize +
        '; --thickness: ' +
        backgroundThickness +
        ';'
      "
    ></div>
    <div
      class="radial-progress text-primary"
      :class="classes"
      :style="
        '--value:' +
        progress +
        '; --size: ' +
        size +
        '; --thickness: ' +
        thickness +
        ';'
      "
    >
      <p class="text-center text-secondary">{{ progress }}%</p>
      <p class="text-center text-xs text-secondary">{{ details }}</p>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

// Props
const props = defineProps([
  "classes",
  "progress",
  "size",
  "thickness",
  "backgroundClasses",
  "backgroundProgress",
  "backgroundSize",
  "backgroundThickness",
  "details",
]);

// Variables
const {
  classes,
  progress,
  size,
  thickness,
  backgroundClasses,
  backgroundProgress,
  backgroundSize,
  backgroundThickness,
  details,
} = toRefs(props);
</script>
