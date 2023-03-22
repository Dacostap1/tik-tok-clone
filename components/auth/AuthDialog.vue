<script setup>
import Login from "./Login.vue";
import Register from "./Register.vue";

const isRegister = ref(true);
</script>

<template>
  <div
    id="AuthDialog"
    class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
  >
    <div class="relative h-[70%] w-full max-w-[470px] rounded-lg bg-white p-4">
      <div class="flex w-full justify-end">
        <button class="rounded-full bg-gray-100 p-1.5">
          <Icon name="mdi:close" size="26"></Icon>
        </button>
      </div>

      <Login v-if="isRegister"></Login>
      <Register v-else></Register>

      <div
        class="absolute left-0 bottom-0 flex w-full items-center justify-center border-t py-5"
      >
        <span class="text-[14px] text-gray-600">Don’t have an account?</span>
        <button
          @click="isRegister = !isRegister"
          class="pl-1 text-[14px] font-semibold text-[#F02C56]"
        >
          <span v-if="isRegister">Sign up</span>
          <span v-else>Log in</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
