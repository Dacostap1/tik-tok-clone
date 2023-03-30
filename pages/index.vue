<script setup>
import MainLayout from "~~/layouts/MainLayout.vue";
import PostMain from "~~/components/PostMain.vue";

const { $generalStore } = useNuxtApp();

definePageMeta({ middleware: "auth" });

onMounted(async () => {
  try {
    await $generalStore.getAllPosts();
  } catch (error) {}
});
</script>

<template>
  <MainLayout>
    <div class="w-[calc(100%-90px)] max-w-[690px] pt-[80px]">
      <div v-for="post in $generalStore.posts" :key="post" class="">
        <PostMain :post="post" />
      </div>
    </div>
  </MainLayout>
</template>

<style scoped></style>
