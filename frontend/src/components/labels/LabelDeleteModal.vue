<template>
  <div class="modal" :class="{ 'modal-open': show }">
    <div class="modal-box relative">
      <label class="btn btn-sm btn-circle absolute right-2 top-2" @click="hide"
        >✕</label
      >
      <h3 class="w-11/12 text-center text-3xl">
        {{ t("Eliminar Cucarda Personalizada") }}
      </h3>
      <div
        class="mt-5 flex flex-col items-center justify-center gap-5 text-center"
      >
        <p>
          {{ t("Nombre") }}: <strong>"{{ label.label }}"</strong>
        </p>
        <p>{{ t("¿Confirmas que deseas eliminar la Cucarda?") }}</p>
      </div>

      <div class="modal-action">
        <button
          class="btn btn-secondary text-base-100"
          :class="{ loading: loading }"
          @click="confirm"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["hide", "confirm"]);

// Props
const props = defineProps(["loading", "label", "show"]);
const { loading, label, show } = toRefs(props);

// Methods
const hide = () => {
  emit("hide");
};
const confirm = () => {
  emit("confirm");
};
</script>
