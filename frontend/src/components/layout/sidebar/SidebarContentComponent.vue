<template>
  <div
    class="sidebar-content mt-auto flex w-full flex-col-reverse py-1 pt-8 pb-0 md:mt-0 md:flex-col"
  >
    <div
      v-if="layoutIsSidebarOpen"
      class="sidebar-content-content flex w-full flex-col-reverse md:flex-col"
    >
      <sidebar-item
        v-for="(m, index) in menus"
        :mini="false"
        :name="m.name"
        :href="m.href"
        :icon="m.icon"
        :type="m.type"
        :children="m.children"
        :showSeparatorTopLine="index !== 0"
      />
    </div>
    <template v-else>
      <sidebar-item
        v-for="(m, index) in menus"
        :mini="true"
        :name="m.name"
        :href="m.href"
        :icon="m.icon"
        :type="m.type"
        :children="m.children"
        :showSeparatorTopLine="index !== 0"
      />
    </template>
  </div>
</template>

<script setup>
import SidebarItem from "./SidebarItem.vue";
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";
import { useLogger } from "@/stores/logger";
import { useI18n } from "vue-i18n";

const logger = useLogger();

// Props
const props = defineProps(["layoutIsSidebarOpen"]);

// Variables
const { layoutIsSidebarOpen } = toRefs(props);
const { t } = useI18n();

const store = ref({});
const menus = ref([
  {
    name: t("menu.dashboard"),
    href: "/dashboard",
    type: "link",
    icon: "ChartPie",
  },
  { name: t("menu.clientes"), href: "/customers", type: "link", icon: "Users" },
  {
    name: t("menu.categoria"),
    href: "/customer-categories",
    type: "link",
    icon: "TableCells",
  },
  { name: t("Cucardas"), href: "/labels", type: "link", icon: "Tag" },
]);

// Methods
const getStore = async () => {
  try {
    const response = await axios.get("stores/current");
    if (response && response.data && response.data.status) {
      // console.log("Current Store:", response.data);
      store.value = response.data.store;
    }
  } catch (error) {
    logger.log("Error obteniendo current Store:", error);
  }
};

// Lifecycle hooks
onMounted(async () => {
  await getStore();
});
</script>
