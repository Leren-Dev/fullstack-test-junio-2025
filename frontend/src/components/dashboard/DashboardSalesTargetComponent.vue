<template>
  <div class="mt-2 flex w-full justify-between">
    <div>
      {{ current }} {{ t("sobre") }} {{ target }} {{ t("ventas objetivo") }}
    </div>
    <div
      class="swap swap-flip"
      :class="{ 'swap-active': editingTarget }"
      @click="editTarget"
    >
      <div class="swap-on flex">
        <input
          type="text"
          v-model="newTarget"
          placeholder="Cantidad"
          class="input-bordered input input-xs w-20"
        />
        <button
          class="btn btn-ghost btn-xs ml-2 p-0"
          :class="{ loading: loading }"
          @click="saveTarget"
        >
          <icon-component
            name="CheckCircle"
            type="outline"
            classes="h-6 w-6 text-primary"
          />
        </button>
      </div>
      <div
        class="tooltip-hover swap-off tooltip tooltip-bottom flex cursor-pointer justify-end"
        data-tip="Modificar objetivo"
      >
        <icon-component name="PencilSquare" type="solid" classes="h-5 w-5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits(["editTarget", "updateTarget"]);

// Props
const props = defineProps(["current", "target", "loading", "editingTarget"]);

// Variables
const { current, target, loading, editingTarget } = toRefs(props);

const newTarget = ref("");

// Methods
const editTarget = () => {
  emit("editTarget");
};
const saveTarget = () => {
  emit("updateTarget", newTarget.value);
};

// Lifecycle hooks
onMounted(() => {
  newTarget.value = target.value;
});
</script>
