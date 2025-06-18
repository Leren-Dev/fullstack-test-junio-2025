<template>
  <section class="login w-full px-1 md:px-2">
    <div class="login-content flex flex-col items-center justify-center">
      <h3 class="card-title text-2xl">{{ t("Iniciar sesión") }}</h3>
      <form action="" class="mt-4 w-full md:w-2/3">
        <div>
          <label class="block" for="email">Email</label>
          <input
            v-model="state.username"
            type="text"
            autocomplete="email"
            class="input-bordered input mt-2 w-full focus:border-accent focus:ring-accent"
            :class="{ 'border-red-500': v$.username.$error }"
          />
          <div v-if="v$.username.$error" class="text-error">
            <p v-for="error in v$.username.$errors">
              {{ t(error.$message) }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <label class="block"> {{ t("Contraseña") }}</label>
          <input
            v-model="state.password"
            type="password"
            autocomplete="current-password"
            class="input-bordered input mt-2 w-full focus:border-accent focus:ring-accent"
            :class="{ 'border-red-500': v$.password.$error }"
          />
          <div v-if="v$.password.$error" class="text-error">
            <p v-for="error in v$.password.$errors">
              {{ t(error.$message) }}
            </p>
          </div>
        </div>
        <div class="mt-4 text-error">
          <p v-for="e in errors">{{ e.message }}</p>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <button
            @click.prevent="login"
            class="btn-primary rounded-box btn mt-4 text-neutral shadow-xl"
            :class="auth.loading ? 'loading' : ''"
          >
            Login
          </button>
        </div>
        <div v-if="loginError" class="pt-4 text-error">
          <p>{{ t("login.error") }}</p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useLayout } from "@/stores/layout";
import axios from "axios";

const layout = useLayout();
const auth = useAuth();
const router = useRouter();
const { t } = useI18n();
const emit = defineEmits(["successfullyLoggedIn"]);

// Props
const props = defineProps([
  "hidePasswordRecoveryButton",
  "showRegisterEventButton",
  "emitLoginEventOnly",
]);

// Variables
const {
  emitLoginEventOnly,
} = toRefs(props);

const state = reactive({
  username: "",
  password: "",
});
const rules = {
  username: { required, email },
  password: { required },
};
const v$ = useVuelidate(rules, state);

const loginError = ref(false);

const errors = ref([]);

// Methods
const login = async () => {
  loginError.value = false;
  errors.value = [];
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      await auth.login(state.username, state.password);

      const storeResponse = await axios.get("stores/current");
      if (storeResponse.data.status) {
        const storeLanguage = storeResponse.data?.store?.main_language || "es";
        auth.setStore(storeResponse.data.store);
        layout.setStoreName(
          storeResponse.data?.store?.names[storeLanguage] ||
            storeResponse.data?.store?.names["es"] ||
            storeResponse.data?.store?.names["pt"] ||
            storeResponse.data?.store?.names["en"]
        );

        localStorage.setItem("lang", storeLanguage);
        layout.setCurrentLang(storeLanguage);
      }

      if (emitLoginEventOnly.value) {
        emit("successfullyLoggedIn");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        errors.value = error.response.data.errors || [];
      }
      console.log("Login error", error);

      loginError.value = true;
    }
  }
};
</script>
