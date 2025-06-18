import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { useAuth } from "./stores/auth";
import axios from "axios";
import mixin from "./helpers.js";
import "./index.css";
import "./custom.css";
import "vue-skeletor/dist/vue-skeletor.css";
import { iconsSet } from "./assets/icons/icons.js";
import IconComponent from "./components/icons/IconComponent.vue";
import Vue3TouchEvents from "vue3-touch-events";
import { createI18n } from "vue-i18n";
import es from "./locales/es.json";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import Notifications from "notiwind";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import notifyPlugin from "@/plugins/notifyPlugin";
import { ColorPicker } from "vue-accessible-color-picker";

axios.defaults.baseURL = import.meta.env.VITE_API_V2_BASE_URL;
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (
      (error &&
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.some(
          (e) => e.message && e.message.indexOf("E_UNAUTHORIZED_ACCESS") !== -1
        )) ||
      (error &&
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.some(
          (e) => e.message && e.message.indexOf("E_INVALID_API_TOKEN") !== -1
        )) ||
      (error &&
        error.response &&
        error.response.status == 401 &&
        (!error.response.statusText ||
          error.response.statusText == "Unauthorized"))
    ) {
      // Logout if error response message contains 'E_UNAUTHORIZED_ACCESS' code
      const auth = useAuth();
      await auth.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const loginStatus = Boolean(Number(localStorage.getItem("login_status")));
const apiToken = localStorage.getItem("api_token");
if (loginStatus && apiToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;
}

const navigatorLanguage =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      "es";

// Translation service
const i18n = createI18n({
  locale: navigatorLanguage === "es" ? "es" : navigatorLanguage.split("-")[0], // set locale
  fallbackLocale: navigatorLanguage === "es" ? "en" : "es", // set fallback locale
  messages: {
    // set locale messages
    en,
    es,
    pt,
  },
  // If you need to specify other options, you can set other options
  // ...
});

createApp(App)
  .use(router)
  .use(store)
  .use(Vue3TouchEvents, {
    disableClick: true,
    swipeTolerance: 60,
  })
  .use(i18n)
  .use(Notifications)
  .use(notifyPlugin)
  .provide("icons", iconsSet)
  .component("IconComponent", IconComponent)
  .component("VueDatePicker", VueDatePicker)
  .component("Multiselect", Multiselect)
  .component("ColorPicker", ColorPicker)
  .mixin(mixin)
  .mount("#app");
