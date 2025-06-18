import { defineStore } from "pinia";
import anime from "animejs";

export const useLayout = defineStore("layout-store", {
  state: () => {
    return {
      isMobile: true,
      isHeaderVisible: true,
      isSidebarVisible: true,
      isSidebarOpen: true,
      isSidebarNotificationsOpen: false,
      isGoToLoginVisible: true,
      showBackdrop: false,
      showingNotifications: true,
      currentTheme: "light",
      storeName: "Store",
      storeLang: "es",
    };
  },

  actions: {
    async setIsMobile(isMobile) {
      this.isMobile = isMobile;
    },
    async showSidebar() {
      this.isSidebarVisible = true;
    },
    async hideSidebar() {
      this.isSidebarVisible = false;
    },
    async showHeader() {
      this.isHeaderVisible = true;
    },
    async hideHeader() {
      this.isHeaderVisible = false;
    },
    async openSidebar() {
      if (!this.isSidebarOpen) {
        anime({
          targets: ".sidebar",
          width: "20rem",
          direction: "normal",
          easing: "easeOutElastic(2, 0.6)",
        });
        this.isSidebarOpen = true;
      }
    },
    async closeSidebar() {
      if (this.isSidebarOpen) {
        anime({
          targets: ".sidebar",
          width: "3rem",
          direction: "normal",
          easing: "spring(1, 80, 12, 8)",
        });
        this.isSidebarOpen = false;
      }
    },
    async openSidebarNotifications() {
      if (!this.isSidebarNotificationsOpen) {
        this.isSidebarNotificationsOpen = true;
      }
    },
    async closeSidebarNotifications() {
      if (this.isSidebarNotificationsOpen) {
        this.isSidebarNotificationsOpen = false;
      }
    },
    async showGoToLoginButton() {
      this.isGoToLoginVisible = true;
    },
    async hideGoToLoginButton() {
      this.isGoToLoginVisible = false;
    },
    async showBackdrop() {
      this.showBackdrop = true;
    },
    async hideBrackdrop() {
      this.showBackdrop = false;
    },
    async setStoreName(name) {
      this.storeName = name;
    },
    async setCurrentTheme(theme) {
      this.currentTheme = theme;
    },
    async setCurrentLang(lang) {
      this.storeLang = lang;
    },
    async toggleCurrentTheme() {
      if (this.currentTheme == "dark") this.currentTheme = "light";
      else this.currentTheme = "dark";
    },
    async toggleCurrentLang(lang) {
      this.storeLang = lang;
    },
  },
});
