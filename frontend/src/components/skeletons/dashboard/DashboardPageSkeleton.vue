<template>
  <Skeletor
    :shimmer="false"
    class="card col-span-1 shadow-xl drop-shadow-xl"
    height="260"
  />
  <Skeletor
    :shimmer="false"
    class="card col-span-1 shadow-xl drop-shadow-xl"
    height="260"
  />
  <Skeletor
    :shimmer="false"
    class="card col-span-2 shadow-xl drop-shadow-xl"
    height="260"
  />
  <Skeletor
    :shimmer="false"
    class="card col-span-2 shadow-xl drop-shadow-xl"
    height="260"
  />
  <Skeletor
    :shimmer="false"
    class="card col-span-2 drop-shadow-xl xl:col-span-6"
    height="920"
  />
  <Skeletor class="card col-span-2 xl:col-span-6" height="48" />
  <Skeletor
    :shimmer="false"
    class="card col-span-2 mb-10 drop-shadow-xl xl:col-span-3"
    height="552"
  />
  <Skeletor
    :shimmer="false"
    class="card col-span-2 mb-10 drop-shadow-xl xl:col-span-3"
    height="552"
  />
</template>

<script setup>
import { Skeletor } from "vue-skeletor";
</script>
