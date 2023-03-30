<script setup>
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <div class="h-[100vh] bg-[#f8f8f8]">
    <Navbar></Navbar>
    <div class="mx-auto flex w-full max-w-[1140px] justify-between px-2">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
