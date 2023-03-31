<script setup>
import { useHelper } from "~/composables/useHelper";
const { toLowerCaseAndTrim } = useHelper();

const props = defineProps(["post"]);
const { post } = toRefs(props);

const { $generalStore, $userStore } = useNuxtApp();
const router = useRouter();

const { displayPost, likePost, unLikePost } = usePost();

const video = ref(null);

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        console.log("Element is playing " + post.value.id);
        video.value.play();
      } else {
        console.log("Element is paused " + post.value.id);
        video.value.pause();
      }
    },
    { threshold: [0.6] } //porcentaje de la visibilidad del objetivo se debe ejecutar la devolución de llamada del observado
  );

  observer.observe(document.getElementById(`PostMain-${post.value.id}`));
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";

  observer.unobserve(document.getElementById(`PostMain-${post.value.id}`));
});

//fix
const isLiked = computed(() => {
  const res = post.value.likes.find((like) => like.user_id === $userStore.id);

  if (res) {
    return true;
  }
  return false;
});

const showProfile = (user) => {
  console.log("err");
  if (!$userStore.isAuthenticated) {
    $generalStore.isLoginOpen = true;
    return;
  }

  setTimeout(() => router.push(`/profile/${user.id}`), 200);
};
</script>

<template>
  <div :id="`PostMain-${post.id}`" class="flex border-b py-6">
    <div @click="showProfile(post.user)" class="cursor-pointer">
      <img class="rounded-full" width="60" :src="post.user.image" alt="" />
    </div>
    <div class="w-full px-4 pl-3">
      <div class="flex items-center justify-between pb-0.5">
        <button @click="showProfile(post.user)">
          <span class="cursor-pointer font-bold hover:underline">
            {{ toLowerCaseAndTrim(post.user.name) }}
          </span>
          <span
            class="text-light block cursor-pointer text-left text-[13px] text-gray-500 md:inline-block md:pl-1"
          >
            {{ post.user.name }}
          </span>
        </button>

        <button
          class="rounded-md border border-[#F02C56] px-[21px] py-0.5 text-[15px] font-semibold text-[#F02C56] hover:bg-[#ffeef2]"
        >
          Follow
        </button>
      </div>

      <div
        class="max-w-[300px] break-words pb-0.5 text-[15px] md:max-w-[400px]"
      >
        {{ post.text }}
      </div>

      <div class="pb-0.5 text-[14px] text-gray-500">
        #fun #cool #SuperAwesome
      </div>

      <div class="flex items-center pb-0.5 text-[14px] font-semibold">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>

      <div class="mt-2.5 flex">
        <div
          @click="displayPost('/', post)"
          class="relative flex max-h-[580px] min-h-[480px] max-w-[260px] cursor-pointer items-center rounded-xl bg-black"
        >
          <video
            ref="video"
            loop
            muted
            class="mx-auto h-full rounded-xl object-cover"
            :src="post.video"
          ></video>

          <img
            class="absolute right-2 bottom-14"
            width="90"
            src="~/assets/images/tiktok-logo-white.png"
          />
        </div>

        <!-- BOTONES LATERALES -->

        <div class="relative mr-[50px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button
                @click="isLiked ? unLikePost(post) : likePost(post)"
                class="cursor-pointer rounded-full bg-gray-200 p-2"
              >
                <Icon
                  name="mdi:heart"
                  size="20"
                  :color="isLiked ? '#F02C56' : ''"
                />
              </button>
              <span class="text-xs font-semibold text-gray-800">{{
                post.likes.length
              }}</span>
            </div>

            <div class="pb-4 text-center">
              <button class="cursor-pointer rounded-full bg-gray-200 p-2">
                <Icon name="bx:bxs-message-rounded-dots" size="20" />
              </button>
              <span class="text-xs font-semibold text-gray-800">
                {{ post.comments.length }}
              </span>
            </div>

            <div class="pb-4 text-center">
              <button class="cursor-pointer rounded-full bg-gray-200 p-2">
                <Icon name="ri:share-forward-fill" size="20" />
              </button>
              <span class="text-xs font-semibold text-gray-800">34</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
