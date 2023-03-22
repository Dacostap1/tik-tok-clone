<script setup>
const inputFocused = ref(false);
const comment = ref(null);
const video = ref(null);
const isLoaded = ref(null);

watch(
  () => isLoaded.value,
  () => {
    if (isLoaded.value) {
      setTimeout(() => {
        video.value.play();
      }, 500);
    }
  }
);

onMounted(() => {
  isLoaded.value = true;
  video.value.play();

  // video.value.addEventListener("loadeddata", (e) => {
  //   console.log(e.target);
  //   if (e.target) {
  //     setTimeout(() => {
  //       isLoaded.value = true;
  //       console.log(isLoaded.value);
  //     }, 500);
  //   }
  // });
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});
</script>

<template>
  <div
    id="PostPage"
    class="fixed top-0 left-0 z-50 h-full w-full justify-between overflow-auto bg-black lg:flex lg:overflow-hidden"
  >
    <div class="relative h-full lg:w-[calc(100%-540px)]">
      <nuxt-link
        class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        to=""
      >
        <Icon name="material-symbols:close" color="#FFFFFF" size="27" />
      </nuxt-link>

      <div v-if="true">
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostsUp"
          class="absolute right-4 top-4 z-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-up" color="#FFFFFF" size="30" />
        </button>

        <button
          :disabled="!isLoaded"
          @click="loopThroughPostsDown"
          class="absolute right-4 top-20 z-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-down" color="#FFFFFF" size="30" />
        </button>
      </div>

      <img
        class="absolute top-[18px] left-[70px] mx-auto rounded-full lg:mx-0"
        width="45"
        src="~/assets/images/tiktok-logo-small.png"
        alt=""
      />

      <video
        v-if="true"
        class="absolute z-[-1] my-auto h-screen object-cover"
        src="/yates.mp4"
      ></video>

      <div
        v-if="!isLoaded"
        class="flex h-screen items-center justify-center bg-black bg-opacity-70 lg:min-w-[480px]"
      >
        <Icon
          class="ml-1 animate-spin"
          name="mingcute:loading-line"
          color="#FFFFFF"
          size="100"
        ></Icon>
      </div>

      <div class="bg-black bg-opacity-70 lg:min-w-[480]">
        <video
          v-if="true"
          ref="video"
          loop
          muted
          class="mx-auto h-screen"
          src="/yates.mp4"
        ></video>
      </div>
    </div>

    <div
      v-if="true"
      id="InfoSection"
      class="relative h-full w-full bg-white lg:max-w-[550px]"
    >
      <div class="py-7"></div>

      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <nuxt-link to="">
            <img
              class="mx-auto rounded-full lg:mx-0"
              width="40"
              src="https://picsum.photos/id/83/300/320"
              alt=""
            />
          </nuxt-link>

          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">User name</div>
            <div class="-mt-5 text-[13px] font-light">
              User name
              <span class="relative -top-[2px] pr-0.5 text-[30px]">.</span>
              <span class="font-medium">Date here</span>
            </div>
          </div>
        </div>

        <Icon
          @click="deletePost()"
          class="cursor-pointer"
          name="material-symbols:delete-outline-sharp"
          size="25"
        />
      </div>

      <div class="mt-4 px-8 text-sm">This is the post text</div>

      <div class="mt-4 px-8 text-sm font-bold">
        <Icon name="mdi:music" size="17" />
        original sound - User name
      </div>

      <div class="mt-8 flex items-center px-8">
        <div class="flex items-center pb-4 text-center">
          <button
            @click="isLiked ? unlikePost() : likePost()"
            class="cursor-pointer rounded-full bg-gray-200 p-2"
          >
            <Icon
              name="mdi:heart"
              size="25"
              :color="isLiked ? '#F02C56' : ''"
            />
          </button>
          <span class="pl-2 pr-4 text-xs font-semibold text-gray-800">
            123
          </span>
        </div>

        <div class="flex items-center pb-4 text-center">
          <div class="cursor-pointer rounded-full bg-gray-200 p-2">
            <Icon name="bx:bxs-message-rounded-dots" size="25" />
          </div>
          <span class="pl-2 text-xs font-semibold text-gray-800">43</span>
        </div>
      </div>

      <div
        id="Comments"
        class="z-0 h-[calc(100%-273px)] w-full overflow-auto border-t-2 bg-[#F8F8F8]"
      >
        <div class="pt-2"></div>

        <div v-if="false" class="mt-6 text-center text-xl text-gray-500">
          No comments...
        </div>

        <div v-else class="mt-4 flex items-center justify-between px-8">
          <div class="itesm-center relative flex w-full">
            <nuxt-link to="">
              <img
                class="absolute mx-auto rounded-full lg:mx-0"
                width="40"
                src="https://picsum.photos/id/83/300/320"
                alt=""
              />
            </nuxt-link>

            <div class="ml-14 w-full pt-0.5">
              <div
                class="flex items-center justify-between text-[18px] font-semibold"
              >
                userName
                <Icon
                  @click="deleteComment()"
                  name="material-symbols:delete-outline-sharp"
                  size="25"
                />
              </div>
              <div class="text-[15px] font-light">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
                odit cumque provident illum vero voluptas, eos impedit similique
                veniam natus et optio fugit commodi at iusto id. Repellendus, ab
                dolorum!
              </div>

              <div class="mb-28" />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="true"
        id="CreateComent"
        class="absolute bottom-0 flex h-[85px] w-full items-center justify-between border-t-2 bg-white py-5 px-8 lg:max-w-[550px]"
      >
        <div
          :class="
            inputFocused
              ? 'border-2 border-gray-400'
              : 'border-2 border-[#F1F1F2]'
          "
          class="flex w-full items-center rounded-lg bg-[#F1F1F2] lg:max-w-[420px]"
        >
          <input
            v-model="comment"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            class="w-full rounded-lg bg-[#F1F1F2] p-2 text-[14px] focus:outline-none lg:max-w-[420px]"
            type="text"
            placeholder="Add comment..."
          />
        </div>
        <button
          :disabled="!comment"
          @click="addComment()"
          :class="comment ? 'cursor-pointer text-[#F02C56]' : 'text-gray-400'"
          class="ml-5 pr-1 text-sm font-semibold"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
