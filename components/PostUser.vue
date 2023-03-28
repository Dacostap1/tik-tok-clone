<script setup>
const props = defineProps(["post"]);

const { $generalStore } = useNuxtApp();
const router = useRouter();

const video = ref(null);
const isLoaded = ref(false);

//SET URL FROM BACK AFTER SHOW A POST
const displayPost = () => {
  $generalStore.setBackUrl(`/profile/${route.params.id}`);
  $generalStore.selectedPost = null;

  setTimeout(() => {
    router.push(`/post/${post.id}`);
  }, 300);
};

onMounted(() => {
  if (video.value) {
    console.log(video.value);
    //Necesario para que detecte el evento loadeddata, no tiene relacion con el atributo autoplay
    video.value.load();

    video.value.addEventListener("loadeddata", (e) => {
      console.log(e.target);
      if (e.target) {
        setTimeout(() => {
          isLoaded.value = true;
          console.log(isLoaded.value);
        }, 200);
      }
    });
  }
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});

const isHover = (bool) => {
  if (bool) {
    video.value.play();
  } else {
    video.value.pause();
  }
};
</script>

<template>
  <div
    @click="displayPost(post)"
    @mouseenter="isHover(true)"
    @mouseleave="isHover(false)"
    class="relative cursor-pointer brightness-90 hover:brightness-[1.1]"
  >
    <div
      v-if="!isLoaded"
      class="absolute top-0 left-0 flex aspect-[3/4] w-full items-center justify-center rounded-md bg-black object-cover"
    >
      <Icon
        class="ml-1 animate-spin"
        name="mingcute:loading-line"
        color="#FFFFFF"
        size="100"
      ></Icon>
    </div>
    <div>
      <video
        ref="video"
        muted
        loop
        class="aspect-[3/4] rounded-md object-cover"
        :src="post.video"
      ></video>
    </div>
    <div class="px-1">
      <div class="break-words pt-1 text-[15px] text-gray-700">
        {{ post.text }}
      </div>
      <div class="-ml-1 flex items-center text-xs font-bold text-gray-600">
        <Icon name="gg:loadbar-sound" size="20" />
        3%
        <Icon class="ml-1" name="tabler:alert-circle" size="16" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
