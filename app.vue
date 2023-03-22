<template>
  <NuxtPage></NuxtPage>

  <AuthDialog v-if="isLoginOpen"></AuthDialog>
</template>

<script setup>
import { storeToRefs } from "pinia";

const { $generalStore } = useNuxtApp();
const { isLoginOpen } = storeToRefs($generalStore);
</script>
