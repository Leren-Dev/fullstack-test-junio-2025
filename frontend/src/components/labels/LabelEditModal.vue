<template>
  <div class="modal" :class="{ 'modal-open': show }">
    <div class="modal-box relative">
      <label class="btn btn-sm btn-circle absolute right-2 top-2" @click="hide"
        >✕</label
      >
      <h3 class="w-11/12 text-center text-3xl">
        {{ t((readOnly ? "Detalle " : (isClone ? (label.is_leren ? "Usar Plantilla de " : "Duplicar ") : "Editar ")) + "Cucarda Personalizada") }}
      </h3>
      <div class="items-left mt-5 flex flex-col justify-center">
        <div class="flex w-full flex-row gap-2">
          <!-- Name -->
          <div class="form-control w-full">
            <label class="label">
              <span
                class="label-text text-lg"
                :class="{ 'text-error': !data.name && showErrors }"
                >{{ t("Nombre") }} *</span
              >
            </label>
            <input
              v-model="data.name"
              type="text"
              class="input-bordered input"
              :class="{ 'border-error': !data.name && showErrors }"
              :disabled="readOnly"
            />
            <label class="label" v-if="!data.name && showErrors">
              <span class="label-text-alt text-error">{{
                t("El campo 'Nombre' es obligatorio.")
              }}</span>
            </label>
          </div>
          <!-- Show At -->
          <div class="form-control w-full">
            <div class="flex items-center">
              <label class="label">
                <span
                  class="label-text text-lg"
                  :class="{ 'text-error': !data.show_at && showErrors }"
                  >{{ t("Ubicación") }} *</span
                >
              </label>
            </div>
            <select
              v-model="data.show_at"
              class="select-bordered select w-full max-w-xs"
              :class="{ 'border-error': !data.show_at && showErrors }"
              :disabled="readOnly"
            >
              <option v-for="option in showAtOptions" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <label class="label" v-if="!data.show_at && showErrors">
              <span class="label-text-alt text-error">{{
                t("El campo 'Ubicación' es obligatorio.")
              }}</span>
            </label>
          </div>
        </div>
        <div class="flex w-full flex-row gap-2">
          <div class="form-control w-full">
            <div class="flex items-center">
              <label class="label">
                <span
                  class="label-text text-lg"
                  :class="{ 'text-error': !data.type && showErrors }"
                  >{{ t("Tipo") }} *</span
                >
              </label>
            </div>
            <select
              v-model="data.type"
              class="select-bordered select w-full max-w-xs"
              :class="{ 'border-error': !data.type && showErrors }"
              :disabled="readOnly || label.is_leren"
            >
              <option v-for="option in typeOptions" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <label class="label" v-if="!data.type && showErrors">
              <span class="label-text-alt text-error">{{
                t("El campo 'Tipo' es obligatorio.")
              }}</span>
            </label>
          </div>
          <div class="form-control w-full">
            <div class="flex items-center">
              <label class="label">
                <span
                  class="label-text text-lg"
                  :class="{ 'text-error': !data.location && showErrors }"
                  >{{ t("Posición") }} *</span
                >
              </label>
            </div>
            <select
              v-model="data.location"
              class="select-bordered select w-full max-w-xs"
              :class="{ 'border-error': !data.location && showErrors }"
              :disabled="readOnly"
            >
              <option value="top_left">{{ t("Superior - Izquierda") }}</option>
              <option value="top_right">{{ t("Superior - Derecha") }}</option>
              <option value="bottom_left">
                {{ t("Inferior - Izquierda") }}
              </option>
              <option value="bottom_right">
                {{ t("Inferior - Derecha") }}
              </option>
              <option value="center">{{ t("Centrada") }}</option>
            </select>
            <label class="label" v-if="!data.location && showErrors">
              <span class="label-text-alt text-error">{{
                t("El campo 'Posición' es obligatorio.")
              }}</span>
            </label>
          </div>
        </div>
        <!-- Caso de type 'text' -> Texto de cucarda -->
        <div
          v-if="!data.type || data.type === 'text'"
          class="form-control w-full"
        >
          <label class="label">
            <span
              class="label-text text-lg"
              :class="{ 'text-error': !data.description && showErrors }"
              >{{ t("Texto de cucarda") }} *</span
            >
          </label>
          <input
            v-model="data.description"
            type="text"
            class="input-bordered input"
            :class="{ 'border-error': !data.description && showErrors }"
            :placeholder="t('Ej: ¡Novedad!')"
            :disabled="readOnly || label.is_leren"
          />
          <label class="label" v-if="!data.description && showErrors">
            <span class="label-text-alt text-error">{{
              t("El campo 'Texto de cucarda' es obligatorio.")
            }}</span>
          </label>
        </div>
        <div v-else-if="!showImageInput" class="h-[200px]"></div>
        <div
          v-if="!data.type || data.type === 'text'"
          class="mt-1 flex w-full flex-row gap-2"
        >
          <div class="form-control w-full">
            <label class="label pr-0">
              <span class="label-text text-lg">{{ t("Color de texto") }}</span>
              <div
                class="h-6 w-12 rounded-lg border border-black"
                :style="{ backgroundColor: data.text_color }"
              ></div>
            </label>
            <div
              tabindex="0"
              class="rounded-lg bg-black bg-opacity-20"
              :class="{ 'collapse-open': collapseTextColor }"
            >
              <div
                class="collapse-title visible flex min-h-0 justify-between p-2"
              >
                <span><strong>Hex:</strong> {{ data.text_color }}</span>
                <button
                  @click="collapseTextColor = !collapseTextColor"
                  class="btn btn-ghost btn-xs"
                  :disabled="readOnly"
                >
                  <icon-component
                    name="Pencil"
                    type="solid"
                    classes="h-4 w-4"
                  />
                </button>
              </div>
              <div
                class="collapse-content p-2 pt-0"
                :class="{ hidden: !collapseTextColor }"
              >
                <ColorPicker
                  default-format="hex"
                  :visible-formats="['hex']"
                  :color="data.text_color"
                  @color-change="handleTextColorChange"
                />
              </div>
            </div>
          </div>
          <div class="form-control w-full">
            <label class="label pr-0">
              <span class="label-text text-lg">{{ t("Color de fondo") }}</span>
              <div
                class="h-6 w-12 rounded-lg border border-black"
                :style="{ backgroundColor: data.background_color }"
              ></div>
            </label>
            <div
              tabindex="0"
              class="rounded-lg bg-black bg-opacity-20"
              :class="{ 'collapse-open': collapseBackgroundColor }"
            >
              <div
                class="collapse-title visible flex min-h-0 justify-between p-2"
              >
                <span><strong>Hex:</strong> {{ data.background_color }}</span>
                <button
                  @click="collapseBackgroundColor = !collapseBackgroundColor"
                  class="btn btn-ghost btn-xs"
                  :disabled="readOnly"
                >
                  <icon-component
                    name="Pencil"
                    type="solid"
                    classes="h-4 w-4"
                  />
                </button>
              </div>
              <div
                class="collapse-content p-2 pt-0"
                :class="{ hidden: !collapseBackgroundColor }"
              >
                <ColorPicker
                  default-format="hex"
                  :visible-formats="['hex']"
                  :color="data.background_color"
                  @color-change="handleBackgroundColorChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-action">
        <button
          class="btn btn-secondary text-base-100"
          :class="{ loading: loading || loadingImageUrl }"
          :disabled="readOnly"
          @click="save"
        >
          {{ t("Guardar") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["hide", "save"]);

// Props
const props = defineProps(["loading", "show", "label", "readOnly", "isClone"]);
const { loading, show, label, readOnly, isClone } = toRefs(props);

// Variables
const collapseBackgroundColor = ref(false);
const collapseTextColor = ref(false);
const data = ref({ ...label.value });
data.value.is_leren = false;
data.value.show_at = label.value.show_at_pdp && label.value.show_at_grids ? 'All' : (label.value.show_at_pdp ? 'pdp' : (label.value.show_at_grids ? 'grids' : null))
if (isClone.value) data.value.id = undefined;
const showAtOptions = [
  {
    label: t("Todas"),
    value: "All",
  },
  {
    label: t("Página del Producto"),
    value: "pdp",
  },
  {
    label: t("Grillas de Productos"),
    value: "grids",
  },
];
const typeOptions = [
  {
    label: t("Texto"),
    value: "text",
  },
];

const showImageInput = ref(true);
const loadingImageUrl = ref(false);

const showErrors = ref(false);

// Methods
const hide = () => {
  emit("hide");
};
const save = () => {
  showErrors.value = false;
  if (
    data.value.name &&
    data.value.show_at &&
    data.value.type &&
    data.value.location &&
    ((data.value.type === "text" && data.value.description) ||
      (data.value.type === "image" && data.value.image_url))
  ) {
    emit("save", data.value);
  } else {
    showErrors.value = true;
  }
};

const handleBackgroundColorChange = async (eventData) => {
  if (eventData.cssColor) {
    data.value.background_color = eventData.cssColor;
  } else {
    data.value.background_color = "#000000ff";
  }
};
const handleTextColorChange = async (eventData) => {
  if (eventData.cssColor) {
    data.value.text_color = eventData.cssColor;
  } else {
    data.value.text_color = "#ffffffff";
  }
};

// Lifecycle hooks
onMounted(() => {
  showErrors.value = false;
  data.value = { ...label.value };
  data.value.is_leren = false;
  data.value.show_at = label.value.show_at_pdp && label.value.show_at_grids ? 'All' : (label.value.show_at_pdp ? 'pdp' : (label.value.show_at_grids ? 'grids' : null))
  if (isClone.value) data.value.id = undefined;
});
</script>
