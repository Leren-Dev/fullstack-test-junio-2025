<template>
  <div class="card card-body mx-2 bg-base-300">
    <p>{{ t("Estamos construyendo esta y otras de las secciones") }} 🚀.</p>
    <p>
      {{
        t(
          "Lo importante es que las funcionalidades principales de la app ya están listas para que las uses, en unos días esta sección estará disponible para que la uses"
        )
      }}.
    </p>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
