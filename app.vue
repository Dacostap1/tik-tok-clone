<template>
  <NuxtPage></NuxtPage>

  <AuthDialog v-if="isLoginOpen"></AuthDialog>
  <EditProfileDialog v-if="isEditProfileOpen"></EditProfileDialog>
</template>

<script setup>
import { storeToRefs } from "pinia";

const { $generalStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore);
</script>
