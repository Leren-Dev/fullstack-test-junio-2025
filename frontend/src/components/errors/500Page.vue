<template>
  <div class="card card-body mx-2 bg-base-300">
    {{ t("¡Ups! Ocurrió un error inesperado") }} ...
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
