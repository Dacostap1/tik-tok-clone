<script setup>
import TextInput from "../TextInput.vue";
const { $userStore, $generalStore } = useNuxtApp();

const email = ref(null);
const password = ref(null);
const errors = ref(null);

onMounted(() => {
  email.value = "dacostap1@gmail.com";
  password.value = "12345678";
});

const login = async () => {
  console.log(email.value);
  console.log(password.value);

  errors.value = null;

  try {
    await $userStore.getToken();
    await $userStore.login(email.value, password.value);
    await $userStore.getUser();

    $generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>

<template>
  <div class="mb-4 text-center text-[28px] font-bold">Log in</div>

  <div class="px-6 pb-1.5 text-[15px]">Email address</div>

  <div class="px-6 pb-2">
    <!--  v-model:input,  input es nombre custom a modelValue  -->
    <TextInput
      placeholder="Email Address"
      v-model:input="email"
      input-type="email"
      :auto-focus="true"
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

  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

  <div class="mt-6 px-6 pb-2">
    <button
      :disabled="!email || !password"
      :class="!email || !password ? 'bg-gray-200' : 'bg-[#F02C56]'"
      @click="login()"
      class="w-full rounded-sm py-3 text-[17px] font-semibold text-white"
    >
      Log in
    </button>
  </div>
</template>

<style scoped></style>
