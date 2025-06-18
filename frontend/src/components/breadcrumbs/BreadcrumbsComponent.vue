<template>
  <button
    class="btn-ghost rounded-box btn-sm btn h-10 px-2"
    :title="nombreStore"
  >
    <p
      class="max-w-[220px] overflow-clip text-ellipsis whitespace-nowrap 3xl:max-w-sm"
    >
      {{ nombreStore }}
    </p>
  </button>
  <div
    class="breadcrumbs mr-auto flex max-w-xs justify-end overflow-hidden p-0 text-xs md:max-w-[360px] md:text-sm 3xl:max-w-screen-sm"
  >
    <ul>
      <li class="h-10" v-for="(r, i) in router.currentRoute.value.matched">
        <p v-if="r.props.default.show === false" class="hidden">{{ r.name }}</p>
        <router-link
          v-else-if="i != router.currentRoute.value.matched.length - 1"
          :to="r.path"
          >{{ r.name }}</router-link
        >
        <p v-else>{{ r.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useLayout } from "@/stores/layout";

const router = useRouter();
const layout = useLayout();

const nombreStore = computed(() => layout.storeName);
</script>
