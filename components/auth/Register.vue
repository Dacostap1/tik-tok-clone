<script setup>
import TextInput from "../TextInput.vue";

const { $userStore, $generalStore } = useNuxtApp();

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

const errors = ref(null);

const register = async () => {
  console.log(email.value);
  console.log(password.value);

  errors.value = null;

  try {
    await $userStore.getToken();
    await $userStore.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    await $userStore.getUser();

    $generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
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
      :error="errors && errors.name ? errors.name[0] : ''"
    ></TextInput>
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      input-type="email"
      :error="errors && errors.email ? errors.email[0] : ''"
    ></TextInput>
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      input-type="password"
      :error="errors && errors.password ? errors.password[0] : ''"
    ></TextInput>
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Confirm password"
      v-model:input="confirmPassword"
      input-type="password"
      :error="errors && errors.confirmPassword ? errors.confirmPassword[0] : ''"
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
