<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const intervalMS = 60 * 60 * 1000; // 1 hour

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});

// const close = async () => {
//   offlineReady.value = false;
//   needRefresh.value = false;
// };
</script>

<template>
  <div
    v-if="/* offlineReady ||  */ needRefresh"
    class="pwa-toast"
    role="alert"
  >
    <div class="message">
      <!-- <span v-if="offlineReady"> App ready to work offline </span> -->
      <span v-if="!offlineReady">
        ¡{{ t("Nueva versión de LerenTools disponible") }}!
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">
      {{ t("Aceptar") }}
    </button>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 50%;
  transform: translateX(50%);
  top: 40px;
  margin: auto;
  padding: 12px;
  font-size: 1.2rem;
  border: 2px solid #8885;
  border-radius: 0.5rem;
  z-index: 1;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: white;
  min-width: 300px;
  text-align: center;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 2px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 0.5rem;
  padding: 3px 10px;
  font-weight: bold;
}
</style>
