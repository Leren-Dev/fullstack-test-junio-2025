import { defineStore } from "pinia";

export const useLogger = defineStore("logger-store", {
  state: () => {
    return {};
  },

  actions: {
    log(...args) {
      if (import.meta.env.DEV) {
        console.log.apply(console, args);
      }
    },
  },
});
