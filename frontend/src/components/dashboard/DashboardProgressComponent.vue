<template>
  <div class="card">
    <progress
      class="progress progress-primary absolute w-full opacity-30"
      :class="classes"
      :value="backgroundProgress"
      max="100"
    ></progress>
    <progress
      class="progress progress-primary w-full"
      :class="backgroundClasses"
      :value="progress"
      max="100"
    ></progress>
    <div class="absolute flex h-full items-center pl-9">
      <p :class="textClasses">{{ progress }}%</p>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

// Props
const props = defineProps([
  "classes",
  "progress",
  "backgroundClasses",
  "backgroundProgress",
  "textClasses",
]);

// Variables
const {
  classes,
  progress,
  backgroundClasses,
  backgroundProgress,
  textClasses,
} = toRefs(props);
</script>
