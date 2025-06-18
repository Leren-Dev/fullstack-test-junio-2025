<template>
  <div class="modal" :class="{ 'modal-open': show }">
    <div class="modal-box relative">
      <label class="btn btn-sm btn-circle absolute right-2 top-2" @click="hide"
        >✕</label
      >
      <h3 class="w-11/12 text-center text-3xl">Nueva Categoría</h3>
      <div class="mt-5 flex flex-col items-center justify-center">
        <div class="form-control w-full">
          <label class="label">
            <span
              class="label-text text-lg"
              :class="{ 'text-error': !data.name && showErrors }"
              >Nombre *</span
            >
          </label>
          <input
            v-model="data.name"
            type="text"
            class="input-bordered input"
            :class="{ 'border-error': !data.name && showErrors }"
          />
          <label class="label" v-if="!data.name && showErrors">
            <span class="label-text-alt text-error"
              >El campo "Nombre" es obligatorio.</span
            >
          </label>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-lg">Descripción</span>
          </label>
          <input v-model="data.description" class="input-bordered input" />
        </div>
      </div>

      <div class="modal-action">
        <button
          class="btn btn-secondary text-base-100"
          :class="{ loading: loading }"
          @click="save"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";

const emit = defineEmits(["hide", "save"]);

// Props
const props = defineProps(["loading", "show"]);
const { loading, show } = toRefs(props);

// Variables
const data = ref({
  name: "",
  description: "",
});
const showErrors = ref(false);

// Methods
const hide = () => {
  emit("hide");
};
const save = () => {
  showErrors.value = false;
  if (data.value.name) {
    emit("save", data.value);
  } else {
    showErrors.value = true;
  }
};

// Lifecycle hooks
onMounted(() => {
  showErrors.value = false;
  data.value = {
    name: "",
    description: "",
  };
});
</script>
