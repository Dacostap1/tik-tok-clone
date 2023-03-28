<script setup>
import MainLayout from "~~/layouts/MainLayout.vue";
import PostUser from "~~/components/PostUser.vue";
import { storeToRefs } from "pinia";

const { $userStore, $profileStore, $generalStore } = useNuxtApp();
const { posts } = storeToRefs($profileStore);

const route = useRoute();

const show = ref(false);

watch(
  () => posts.value,
  () => {
    setTimeout(() => {
      show.value = true;
    }, 300);
  }
);

const formatText = () => {};

onMounted(async () => {
  try {
    console.log(route.params.id);
    await $profileStore.getProfile(route.params.id);
  } catch (error) {
    console.log("xd");
    console.log(error);
  }
});
</script>

<template>
  <MainLayout>
    <div
      v-if="$profileStore.name"
      class="w-[calc(100%-90px)] max-w-[1800px] pt-[90px] pr-2 lg:pl-[160px] lg:pr-0 2xl:mx-auto 2xl:pl-[185px]"
    >
      <!-- 100vw = h-screen -->
      <div class="flex w-[calc(100vw-230px)]">
        <img
          class="max-w-[120px] rounded-full"
          :src="$profileStore.image"
          alt=""
        />

        <div class="ml-5 w-full">
          <div class="truncate text-[30px] font-bold">
            {{ $profileStore.name }}
          </div>
          <div class="truncate text-[18px] font-bold">
            {{ $profileStore.name }}
          </div>
          <button
            v-if="$profileStore.id === $userStore.id"
            @click="$generalStore.isEditProfileOpen = true"
            class="mt-3 flex items-center rounded-md border py-1.5 px-3.5 text-[15px] font-semibold hover:bg-gray-100"
          >
            <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18" />
            <div>Edit profile</div>
          </button>
          <button
            v-else
            class="mt-3 flex items-center rounded-md border bg-[#F02C56] py-1.5 px-8 text-[15px] font-semibold text-white"
          >
            Follow
          </button>
        </div>
      </div>

      <div class="flex items-center pt-4">
        <div class="mr-4">
          <span class="font-bold">10K</span>
          <span class="pl-1.5 text-[15px] font-light text-gray-500"
            >Following</span
          >
        </div>
        <div class="mr-4">
          <span class="font-bold">44K</span>
          <span class="pl-1.5 text-[15px] font-light text-gray-500"
            >Followers</span
          >
        </div>
        <div class="mr-4">
          <span class="font-bold">3k</span>
          <span class="pl-1.5 text-[15px] font-light text-gray-500">Likes</span>
        </div>
      </div>

      <div
        class="mr-4 max-w-[500px] pt-4 pl-1.5 text-[15px] font-light text-gray-500"
      >
        {{ $profileStore.bio }}
      </div>

      <div class="flex w-full items-center border-b pt-4">
        <div
          class="w-60 border-b-2 border-b-black py-2 text-center text-[17px] font-semibold"
        >
          Videos
        </div>
        <div
          class="w-60 py-2 text-center text-[17px] font-semibold text-gray-500"
        >
          <Icon name="material-symbols:lock-open" class="mb-0.5" /> Liked
        </div>
      </div>

      <div
        class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        <div v-if="show" v-for="post in $profileStore.posts">
          <PostUser :post="post"></PostUser>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped></style>
