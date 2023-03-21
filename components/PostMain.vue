<script setup>
const video = ref(null);

onMounted(() => {
  video.value.play();
});
</script>

<template>
  <div id="PostMain" class="flex border-b py-6">
    <div class="cursor-pointer">
      <img
        class="rounded-full"
        width="60"
        src="https://picsum.photos/id/83/300/320"
        alt=""
      />
    </div>
    <div class="w-full px-4 pl-3">
      <div class="flex items-center justify-between pb-0.5">
        <button>
          <span class="cursor-pointer font-bold hover:underline">
            User name
          </span>
          <span class="cursor-pointer text-[13px] font-light text-gray-500">
            User name
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
        This is some text
      </div>

      <div class="text=[14px] pb-0.5 text-gray-500">
        #fun #cool #SuperAwesome
      </div>

      <div class="flex items-center pb-0.5 text-[14px] font-semibold">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>

      <div class="mt-2.5 flex">
        <div
          class="relative flex max-h-[580px] min-h-[480px] max-w-[260px] cursor-pointer items-center rounded-xl bg-black"
        >
          <video
            ref="video"
            loop
            muted
            class="mx-auto h-full rounded-xl object-cover"
            src="/yates.mp4"
          ></video>

          <img
            class="absolute right-2 bottom-14"
            width="90"
            src="~/assets/images/tiktok-logo-white.png"
          />
        </div>

        <!-- BOTONES LATERALES -->

        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button class="cursor-pointer rounded-full bg-gray-200 p-2">
                <Icon name="mdi:heart" size="20" />
              </button>
              <span class="text-xs font-semibold text-gray-800">34</span>
            </div>

            <div class="pb-4 text-center">
              <button class="cursor-pointer rounded-full bg-gray-200 p-2">
                <Icon name="bx:bxs-message-rounded-dots" size="20" />
              </button>
              <span class="text-xs font-semibold text-gray-800">34</span>
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
