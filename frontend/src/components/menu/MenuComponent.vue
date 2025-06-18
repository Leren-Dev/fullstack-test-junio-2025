<template>
  <div v-if="loginStatus" class="dropdown dropdown-end shadow-xl">
    <label
      tabindex="0"
      class="btn-neutral btn rounded-box btn-sm h-11 w-28 justify-evenly p-0 px-2 shadow-xl"
    >
      <icon-component name="User" type="solid" classes="h-6 w-6" />
      <span>{{ t("Cuenta") }}</span>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu rounded-box mt-2 w-max bg-base-300 p-2 shadow-xl"
    >
      <!-- Botones del menu -->
      <li
        v-for="item of menuList"
        :key="item.id"
      >
        <router-link :to="item.to" class="p-0">
          <button
            :class="[
              'group flex w-full items-center justify-end rounded-md px-2 py-2 text-sm',
            ]"
          >
            <span class="mr-2">{{ item.name }}</span>
            <icon-component
              :name="item.icon"
              :type="item.iconType"
              :classes="item.iconClasses"
            />
          </button>
        </router-link>
      </li>
      <!-- Boton Cerrar sesión -->
      <li>
        <a class="p-0">
          <button
            @click="logout"
            :class="[
              'group flex w-full items-center justify-end rounded-md px-2 py-2 text-sm',
            ]"
          >
            <span class="mr-2">{{ t("Cerrar sesión") }}</span>
            <icon-component
              name="ArrowRightOnRectangle"
              type="solid"
              classes="mr-2 h-5 w-5"
            />
          </button>
        </a>
      </li>
    </ul>
  </div>
  <!-- Boton Iniciar sesión -->
  <div
    v-else
    class="btn-neutral btn rounded-box btn-sm relative inline-block h-11 w-48 bg-neutral py-1 shadow-xl"
  >
    <router-link to="/login">
      <button class="flex h-full w-full items-center justify-center">
        <icon-component
          name="ArrowLeftOnRectangle"
          type="solid"
          classes="mr-2 h-5 w-5"
        />
        <span class="text-base">{{ t("Iniciar sesión") }}</span>
      </button>
    </router-link>
  </div>
</template>

<script setup>
// Imports
import { computed, onMounted, ref } from "vue";
import { useAuth } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const auth = useAuth();
const { t } = useI18n();

// Variables
const menuList = ref([]);

// Computed
const loginStatus = computed(() => auth.loginStatus);

// Methods
const logout = async () => {
  await auth.logout();
  window.location.href = "/login";
};
const getMenuList = async () => {
  menuList.value = [
    {
      id: 1,
      name: t("Organización"),
      to: "/organization",
      icon: "UserGroup",
      iconType: "outline",
      iconClasses: "mr-2 h-5 w-5",
    },
  ];
};

// Lifecycle hooks
onMounted(() => {
  getMenuList();
});
</script>
