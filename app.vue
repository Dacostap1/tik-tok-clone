<template>
  <NuxtPage></NuxtPage>

  <AuthDialog v-if="isLoginOpen"></AuthDialog>
  <EditProfileDialog v-if="isEditProfileOpen"></EditProfileDialog>
</template>

<script setup>
import { storeToRefs } from "pinia";

const { $userStore, $generalStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore);

watch(
  () => isLoginOpen.value,
  (val) => $generalStore.activateOverflow(val)
);
watch(
  () => isEditProfileOpen.value,
  (val) => $generalStore.activateOverflow(val)
);

onMounted(async () => {
  //Disable overflow
  $generalStore.activateOverflow(false);

  //Al hacer refresh no mantenga abierto los dialogs
  isLoginOpen.value = false;
  isEditProfileOpen.value = false;

  try {
    await $generalStore.hasSessionExpired();
    await $generalStore.getRandomUsers();

    //Si expira intentamos recuperar el usuario
    if ($userStore.id) {
      $userStore.getUser();
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
