<template>
  <template v-if="type === 'separator'">
    <hr v-if="showSeparatorTopLine" class="my-2 w-full" />
    <div
      class="text-md ml-2 mt-2 flex items-center justify-center md:mb-2 md:mt-0"
    >
      <p v-if="!mini" class="w-full text-left">{{ name }}</p>
    </div>
  </template>
  <div
    v-else
    class="flex items-center justify-center"
    :class="{
      'pl-2': !mini && type !== 'dropdown',
      'rounded-lg bg-gradient-to-r from-primary to-accent py-0.5 text-black':
        fullPath.startsWith(href) && type !== 'dropdown',
    }"
  >
    <div
      v-if="type === 'link'"
      :class="{ 'tooltip-hover tooltip tooltip-right': mini }"
      :data-tip="name"
    >
      <router-link :to="href">
        <icon-component
          :name="icon"
          type="solid"
          :classes="mini ? 'h-9 w-6' : 'h-9 w-5'"
        />
      </router-link>
    </div>
    <div
      v-if="mini && type === 'dropdown'"
      class="flex w-full flex-col justify-start text-left"
    >
      <div class="tooltip-hover tooltip tooltip-right" :data-tip="name">
        <Disclosure v-slot="{ open }">
          <DisclosureButton class="flex w-full justify-center">
            <router-link :to="href">
              <icon-component :name="icon" type="solid" classes="h-9 w-6" />
            </router-link>
          </DisclosureButton>
          <DisclosurePanel class="pl-3 text-gray-300">
            <div v-if="type === 'separator'" class="text-left">
              <p>{{ name }}</p>
            </div>
            <div v-else v-for="c in children">
              <router-link :to="c.href">
                <icon-component :name="c.icon" type="solid" classes="h-7 w-6" />
              </router-link>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
    <div v-if="!mini" class="flex w-full items-center justify-between">
      <router-link
        v-if="type === 'link'"
        :to="href"
        class="text-md w-full font-semibold"
      >
        <p class="pl-2 text-left">{{ name }}</p>
      </router-link>
      <div
        v-if="type === 'dropdown'"
        class="flex w-full flex-col justify-start text-left"
      >
        <!-- Dropdown control -->
        <div
          class="flex cursor-pointer p-2 text-left"
          :class="{
            'rounded-lg bg-gradient-to-r from-primary to-accent text-black':
              fullPath.startsWith(href),
          }"
          @click="toggleMenu(href)"
        >
          <icon-component :name="icon" type="solid" classes="h-6 w-6" />
          <p class="text-md w-full pl-2 font-semibold">{{ name }}</p>
        </div>
        <TransitionRoot :show="isShowing">
          <!-- Sliding sidebar -->
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
            class="pl-4"
          >
            <div v-if="type === 'separator'" class="text-left">
              <p>{{ name }}</p>
            </div>
            <div
              v-else
              v-for="c in children"
              class="my-2 w-full"
              :class="{
                'rounded-lg bg-gradient-to-r from-primary to-accent py-0.5 text-black':
                  fullPath.startsWith(c.href),
              }"
            >
              <div class="flex items-center pl-2 text-left">
                <router-link :to="c.href" class="h-4 w-4">
                  <icon-component
                    :name="c.icon"
                    type="solid"
                    classes="h-4 w-4"
                  />
                </router-link>
                <router-link :to="c.href">
                  <p class="w-full pl-2 text-sm font-semibold">{{ c.name }}</p>
                </router-link>
              </div>
            </div>
          </TransitionChild>
        </TransitionRoot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Props
const props = defineProps([
  "mini",
  "name",
  "href",
  "icon",
  "type",
  "children",
  "showSeparatorTopLine",
]);

// Variables
const { fullPath } = toRefs(route);
const {
  mini,
  name,
  href,
  icon,
  type,
  children,
  showSeparatorTopLine,
} = toRefs(props);
const isShowing = ref(false);

const toggleMenu = (route) => {
  router.replace(route);
  isShowing.value = true;
};

onMounted(() => {});
</script>
