<template>
  <div
    class="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-row justify-center"
  >
    <div class="basis-1/3">
      <div class="card w-full bg-base-300 p-2">
        <div class="card-body text-center">
          <login-component />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useLayout } from "@/stores/layout";
import LoginComponent from "@/components/auth/LoginComponent.vue";

const layout = useLayout();

onBeforeMount(() => {
  layout.showSidebar();
  layout.showGoToLoginButton();
});
</script>
