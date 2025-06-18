<template>
  <div class="px-1 pb-2 md:px-2">
    <div
      class="card flex-row items-center gap-2 py-1 px-1 shadow-xl drop-shadow-xl md:px-2"
      :class="getClasses()"
    >
      <div class="min-w-[24px]">
        <icon-component
          name="BoltSlash"
          type="outline"
          class="h-6 w-6"
          v-if="type == 'error'"
        />
        <icon-component
          name="ExclamationTriangle"
          type="outline"
          class="h-6 w-6"
          v-else-if="type == 'warning'"
        />
        <icon-component
          name="InformationCircle"
          type="outline"
          class="h-6 w-6"
          v-else-if="type == 'info'"
        />
        <icon-component
          name="QuestionMarkCircle"
          type="outline"
          class="h-6 w-6"
          v-else
        />
      </div>
      <p v-if="msg">{{ msg }}</p>
      <router-link v-if="cta && cta_to" :to="cta_to"
        ><button
          class="btn btn-ghost whitespace-nowrap border-black hover:border-black"
        >
          {{ cta }}
        </button></router-link
      >
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

// Props
const props = defineProps(["type", "msg", "cta", "cta_to"]);

// Variables
const { type, msg, cta, cta_to } = toRefs(props);

// Methods
const getClasses = () => {
  switch (type.value) {
    case "info":
      return "bg-info text-black";
    case "warning":
      return "bg-warning text-black";
    case "error":
      return "bg-error text-black";

    default:
      return "bg-base-300";
  }
};
</script>
