<script setup>
import TextInput from "../TextInput.vue";

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

const errors = ref(null);

const register = () => {
  console.log(email.value);
  console.log(password.value);
};
</script>

<template>
  <div class="mb-4 text-center text-[28px] font-bold">Sign up</div>

  <div class="px-6 pb-2">
    <!--  v-model:input,  input es nombre custom a modelValue  -->
    <TextInput
      placeholder="Full name"
      v-model:input="name"
      input-type="text"
      :auto-focus="true"
      error=""
    ></TextInput>
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      input-type="email"
      error=""
    ></TextInput>
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      input-type="password"
      error=""
    ></TextInput>
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Confirm password"
      v-model:input="confirmPassword"
      input-type="password"
      error=""
    ></TextInput>
  </div>

  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

  <div class="mt-6 px-6 pb-2">
    <button
      :disabled="!name || !email || !password || !confirmPassword"
      :class="
        !name || !email || !password || !confirmPassword
          ? 'bg-gray-200'
          : 'bg-[#F02C56]'
      "
      @click="register()"
      class="w-full rounded-sm py-3 text-[17px] font-semibold text-white"
    >
      Sign up
    </button>
  </div>
</template>

<style scoped></style>
