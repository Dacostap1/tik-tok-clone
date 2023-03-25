<script setup>
import UploadLayout from "~~/layouts/UploadLayout.vue";

const { $userStore } = useNuxtApp();
const router = useRouter();

const file = ref(null);
const fileData = ref(null);
const fileDisplay = ref(null);
const errorType = ref(null);
const caption = ref("");

const errors = ref(null);
const isUploading = ref(false);

watch(
  () => caption.value,
  (caption) => {
    if (caption.length >= 150) {
      errorType.value = "caption";
      return;
    }

    errorType.value = null;
  }
);

const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
  fileData.value = file.value.files[0];
};

const onDrop = (e) => {
  file.value = e.dataTransfer.files[0];
  fileData.value = e.dataTransfer.files[0];

  errorType.value = "";

  const extension = file.value.name.substring(
    file.value.name.lastIndexOf(".") + 1
  );

  if (extension !== "mp4") {
    errorType.value = "file";
    return;
  }

  fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0]);
};

const createPost = async () => {
  errors.value = null;

  const data = new FormData();

  data.append("video", fileData.value || "");
  data.append("text", caption.value || "");

  if (fileData.value && caption.value) {
    isUploading.value = true;
  }

  try {
    const res = await $userStore.createPost(data);
    if (res.status == 200) {
      setTimeout(() => {
        router.push("/profile/" + $userStore.id);
        isUploading.value = false;
      }, 1000);
    }
  } catch (error) {
    errors.value = error.response.data.errors;
    isUploading.value = false;
  }
};

const discard = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
  caption.value = "";
};

const clearVideo = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
};
</script>

<template>
  <UploadError :error-type="errorType"></UploadError>

  <div
    v-if="isUploading"
    class="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50"
  >
    <Icon
      class="ml-1 animate-spin"
      name="mingcute:loading-line"
      color="#FFFFFF"
      size="100"
    ></Icon>
  </div>

  <UploadLayout>
    <div
      class="mt-[80px] mb-[40px] w-full rounded-md bg-white py-6 px-4 shadow-lg md:px-10"
    >
      <div>
        <div class="text-[23px] font-semibold">Upload video</div>
        <div class="mt-1 text-gray-400">Post a video to your account</div>
      </div>

      <div class="mt-8 gap-6 md:flex">
        <!-- Click en el label para abrir el input porq tiene el for y esta dentro-->
        <label
          v-if="!fileDisplay"
          for="fileInput"
          @drop.prevent="onDrop"
          @dragover.prevent=""
          class="mx-auto mt-4 mb-6 flex h-[470px] w-full max-w-[260px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-3 text-center hover:bg-gray-100 md:mx-0"
        >
          <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1" />
          <div class="mt-4 text-[17px]">Select video to upload</div>
          <div class="mt-1.5 text-[13px] text-gray-500">
            Or drag and drop a file
          </div>
          <div class="mt-12 text-sm text-gray-400">MP4</div>
          <div class="mt-2 text-[13px] text-gray-400">Up to 30 minutes</div>
          <div class="mt-2 text-[13px] text-gray-400">Less than 2 GB</div>
          <div
            class="mt-8 w-[80%] rounded-sm bg-[#F02C56] px-2 py-1.5 text-[15px] text-white"
          >
            Select file
          </div>
          <input
            ref="file"
            type="file"
            id="fileInput"
            @input="onChange"
            hidden
            accept=".mp4"
          />
        </label>

        <div
          v-else
          class="relative mx-auto mt-4 mb-16 flex h-[540px] w-full max-w-[260px] cursor-pointer items-center justify-center rounded-2xl p-3 md:mx-0 md:mb-12"
        >
          <div class="h-full w-full bg-black"></div>

          <img
            class="pointer-events-none absolute z-20"
            src="~/assets/images/mobile-case.png"
            alt=""
          />

          <img
            class="absolute right-4 bottom-6 z-20"
            width="90"
            src="~/assets/images/tiktok-logo-white.png"
          />

          <video
            autoplay
            loop
            muted
            class="absolute z-10 h-full w-full rounded-xl object-cover p-[13px]"
            :src="fileDisplay"
          ></video>

          <div
            class="absolute -bottom-12 z-50 flex w-full items-center justify-between rounded-xl border border-gray-300 p-2"
          >
            <div class="flex items-center truncate">
              <Icon
                name="clarity:success-standard-line"
                size="16"
                class="min-w-[16px]"
              />
              <div class="truncate text-ellipsis pl-1 text-[11px]">
                {{ fileData.name }}
              </div>
            </div>

            <button @click="clearVideo" class="ml-2 text-[11px] font-semibold">
              Change
            </button>
          </div>
        </div>

        <div class="mt-4 mb-6">
          <div class="flex bg-[#F8F8F8] py-4 px-6">
            <div>
              <Icon class="mr-4" name="mdi:box-cutter-off" size="20" />
            </div>

            <div>
              <div class="text-semibold mb-1.5 text-[15px]">
                Divide videos and edit
              </div>
              <div class="text-semibold text-[13px] text-gray-400">
                You can quickly divide videos into multiple parts, remove
                redundant parts and turn landscape videos into portrait videos
              </div>
            </div>
            <div
              class="my-auto flex h-full w-full max-w-[130px] justify-end text-center"
            >
              <button
                class="rounded-sm bg-[#F02C56] px-8 py-1.5 text-[15px] text-white"
              >
                Edit
              </button>
            </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 text-[15px]">Caption</div>
              <div class="text-[12px] text-gray-400">
                {{ caption.length }}/150
              </div>
            </div>

            <input
              v-model="caption"
              maxlength="150"
              type="text"
              class="w-full rounded-md border p-2.5 focus:outline-none"
            />
          </div>

          <div class="flex gap-3">
            <button
              @click="discard"
              class="mt-8 rounded-sm border px-10 py-2.5 text-[16px] hover:bg-gray-100"
            >
              Discard
            </button>
            <button
              @click="createPost"
              class="mt-8 rounded-sm border bg-[#F02C56] px-10 py-2.5 text-[16px] text-white"
            >
              Post
            </button>
          </div>

          <!-- Show Errors -->

          <div v-if="errors" class="mt-4">
            <div v-if="errors && errors.video" class="text-red-600">
              {{ errors.video[0] }}
            </div>
            <div v-if="errors && errors.text" class="text-red-600">
              {{ errors.text[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UploadLayout>
</template>

<style scoped></style>
