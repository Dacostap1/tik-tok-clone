<script setup>
import Navbar from "~~/components/Navbar.vue";
import SideNavMain from "~~/components/SideNavMain.vue";

const route = useRoute();
</script>

<template>
  <Navbar />
  <div
    :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''"
    class="mx-auto flex w-full justify-between px-0 lg:px-2.5"
  >
    <div>
      <SideNavMain />
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
