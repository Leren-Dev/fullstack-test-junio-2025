import { defineStore } from "pinia";
import axios from "axios";

export const useAuth = defineStore("auth-store", {
  state: () => {
    return {
      loading: false,
      loginStatus: Boolean(Number(localStorage.getItem("login_status"))),
      apiToken: localStorage.getItem("api_token"),
      user: {},
      store: {},
    };
  },

  actions: {
    async login(email, password) {
      this.loading = true;

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + "login",
          { email: email, password: password }
        );

        this.apiToken = response.data.token;
        this.loginStatus = true;

        localStorage.setItem("api_token", this.apiToken);
        localStorage.setItem("login_status", this.loginStatus ? 1 : 0);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.apiToken}`;

        this.loading = false;

        return true;
      } catch (error) {
        // console.log("Login error:", error)

        axios.defaults.headers.common["Authorization"] = null;

        this.loading = false;

        throw error;
      }
    },
    async localLogout() {
      this.loading = true;

      this.loginStatus = false;
      this.apiToken = "";
      this.user = {};

      localStorage.setItem("api_token", null);
      localStorage.setItem("login_status", 0);

      axios.defaults.headers.common["Authorization"] = null;

      this.loading = false;

      return true;
    },
    async logout() {
      this.loading = true;

      try {
        await axios.get(import.meta.env.VITE_API_BASE_URL + "logout");
      } catch (error) {
        // console.log("Logout error:", error);
      }

      this.loginStatus = false;
      this.apiToken = "";
      this.user = {};

      localStorage.setItem("api_token", null);
      localStorage.setItem("login_status", 0);

      axios.defaults.headers.common["Authorization"] = null;

      this.loading = false;

      return true;
    },

    async setStore(store) {
      this.store = store;
    },
  },
});
