<template>
  <section class="dashboard px-1 md:px-2">
    <div
      v-if="loading"
      class="dashboard-content-loading grid grid-cols-2 gap-2 xl:grid-cols-6"
    >
      <dashboard-page-skeleton />
    </div>
    <div
      v-else
      class="dashboard-content grid grid-cols-2 gap-2 overflow-x-auto xl:grid-cols-6"
    >
      <!-- Card Ordenes Enviadas -->
      <Skeletor
        :shimmer="false"
        class="card col-span-1 shadow-xl drop-shadow-xl"
        height="260"
      />

      <!-- Card Ordenes Pagadas -->
      <Skeletor
        :shimmer="false"
        class="card col-span-1 shadow-xl drop-shadow-xl"
        height="260"
      />

      <!-- Card Objetivo de ventas mensuales -->
      <Skeletor
        :shimmer="false"
        class="card col-span-2 shadow-xl drop-shadow-xl"
        height="260"
      />

      <!-- Card Cantidad de ventas por mes -->
      <Skeletor
        :shimmer="false"
        class="card col-span-2 shadow-xl drop-shadow-xl"
        height="260"
      />

      <!-- Sección de instructivos en dashboard -->
      <Skeletor
        class="card col-span-2 xl:col-span-6"
        height="48"
      />
      <Skeletor
        :shimmer="false"
        class="card col-span-2 mb-10 drop-shadow-xl xl:col-span-3"
        height="552"
      />
      <Skeletor
        :shimmer="false"
        class="card col-span-2 mb-10 drop-shadow-xl xl:col-span-3"
        height="552"
      />
    </div>
  </section>
</template>

<script setup>
// Imports
import { ref, onBeforeMount, onMounted } from "vue";
import { useLayout } from "@/stores/layout";
import { useLogger } from "@/stores/logger";
import DashboardPageSkeleton from "@/components/skeletons/dashboard/DashboardPageSkeleton.vue";
import axios from "@/axiosInstance.js";
import { Skeletor } from "vue-skeletor";

const logger = useLogger();
const layout = useLayout();

// Variables
const loading = ref(true);
const msg = ref("");

const cantOrders = ref(0);
const cantOrdersCancelled = ref(0);
const cantOrdersNotCancelled = ref(0);
const expectedOrdersMonth = ref(0);

// Methods
const getDashboard = async () => {
  loading.value = true;
  try {
    const response = await axios.get("dashboard", {
      id: "get-dashboard",
      cache: {
        ttl: 1000 * 60 * 15, // 15 min
      },
    });

    logger.log("Dashboard response:", response.data || response);
    if (response.data.status) {
      msg.value = response.data.msg;

      const dashboardData = response.data.dashboard;
      cantOrders.value = dashboardData.cant_orders;
      cantOrdersCancelled.value = dashboardData.cant_orders_cancelled;
      cantOrdersNotCancelled.value =
        cantOrders.value - cantOrdersCancelled.value;
      expectedOrdersMonth.value = dashboardData.expected_orders_month;

      loading.value = false;
    }
  } catch (error) {
    logger.log("Dashboard error:", error.response || error);
    msg.value = "Error";
    loading.value = false;
  }
};

// Lifecycle hooks
onBeforeMount(() => {
  layout.showSidebar();
  layout.showGoToLoginButton();
});
onMounted(() => {
  getDashboard();
});
</script>
