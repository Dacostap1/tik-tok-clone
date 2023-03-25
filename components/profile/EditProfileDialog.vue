<script setup>
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { storeToRefs } from "pinia";

const { $generalStore, $userStore } = useNuxtApp();
const { name, bio, image } = storeToRefs($userStore);

const file = ref(null);
const cropper = ref(null);
const uploadedImage = ref(null);
const userName = ref(null);
const userImage = ref(null);
const userBio = ref(null);
const isUpdated = ref(null);

onMounted(() => {
  userName.value = name.value;
  userBio.value = bio.value;
  userImage.value = image.value;
});

watch(
  () => userName.value,
  () => {
    if (!userName.value || userName.value === name.value) {
      isUpdated.value = false;
    } else {
      isUpdated.value = true;
    }
  }
);

watch(
  () => userBio.value,
  () => {
    if (!userBio.value || userBio.value.length < 1) {
      isUpdated.value = false;
    } else {
      isUpdated.value = true;
    }
  }
);

const getUploadedImage = (e) => {
  file.value = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(file.value);
};

const cropAndUpdateImage = async () => {
  const { coordinates } = cropper.value.getResult(); //by ref

  console.log(coordinates);
  console.log(file.value);

  const data = new FormData();

  data.append("image", file.value || "");
  data.append("height", coordinates.height || "");
  data.append("width", coordinates.width || "");
  data.append("left", coordinates.left || "");
  data.append("top", coordinates.top || "");

  try {
    await $userStore.updateUserImage(data);
    await $userStore.getUser();

    userImage.value = image.value;
    uploadedImage.value = null;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async () => {
  try {
    await $userStore.updateUser(userName.value, userBio.value);
    await $userStore.getUser();
    // await $profileStore.getProfile(route.params.id);
    userName.value = name.value;
    userBio.value = bio.value;
    setTimeout(() => {
      $generalStore.isEditProfileOpen = false;
    }, 100);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div
    id="EditProfileDialog"
    class="fixed top-0 left-0 z-50 flex h-full w-full justify-center overflow-auto bg-black bg-opacity-50 pt-14 md:pt-[105px]"
  >
    <div
      :class="!uploadedImage ? 'h-[655px]' : 'h-[580px]'"
      class="relative mx-3 mb-10 h-[655px] w-full max-w-[700px] rounded-lg bg-white p-4 sm:h-[580px]"
    >
      <div
        class="absolute left-0 top-0 flex w-full items-center justify-between border-b border-b-gray-300 p-5"
      >
        <div class="text-[22px] font-medium">Edit profile</div>

        <button @click="$generalStore.isEditProfileOpen = false">
          <Icon name="mdi:close" size="25" />
        </button>
      </div>

      <div
        class="h-[calc(500px-200px)]"
        :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'"
      >
        <div v-if="!uploadedImage">
          <div
            id="ProfilePhotoSection"
            class="flex h-[145px] w-full flex-col border-b px-1.5 py-2 sm:h-[118px]"
          >
            <div
              class="mb-1 text-center text-[15px] font-semibold text-gray-700 sm:mb-0 sm:w-[160px] sm:text-left"
            >
              Profile photo
            </div>

            <div class="flex items-center justify-center sm:-mt-6">
              <label for="image" class="relative cursor-pointer">
                <img class="rounded-full" width="95" :src="userImage" />
                <div
                  class="absolute bottom-0 right-0 inline-block w-[32px] rounded-full border border-gray-300 bg-white p-1 shadow-xl"
                >
                  <Icon
                    name="ph:pencil-simple-line-bold"
                    size="17"
                    class="-mt-1 ml-0.5"
                  />
                </div>
              </label>
              <input
                id="image"
                class="hidden"
                type="file"
                @input="getUploadedImage"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </div>

          <!-- UsernameSectionSection -->
          <div
            id="UsernameSectionSection"
            class="mt-1.5 flex w-full flex-col border-b px-1.5 py-2 sm:h-[118px]"
          >
            <div
              class="mb-1 text-center text-[15px] font-semibold text-gray-700 sm:mb-0 sm:w-[160px] sm:text-left"
            >
              Username
            </div>

            <div class="flex items-center justify-center sm:-mt-6">
              <div class="w-full max-w-md sm:w-[60%]">
                <TextInput
                  placeholder="Username"
                  v-model:input="userName"
                  inputType="text"
                  max="30"
                />
                <div class="mt-4 text-[11px] text-gray-500">
                  Usernames can only contain letters, numbers, underscores, and
                  periods. Changing your username will also change your profile
                  link.
                </div>
              </div>
            </div>
          </div>

          <!-- BioSection -->
          <div
            id="BioSection"
            class="mt-2 flex w-full flex-col px-1.5 py-2 sm:h-[120px]"
          >
            <div
              class="mb-1 text-center text-[15px] font-semibold text-gray-700 sm:mb-0 sm:w-[160px] sm:text-left"
            >
              Bio
            </div>

            <div class="flex items-center justify-center sm:-mt-6">
              <div class="w-full max-w-md sm:w-[60%]">
                <textarea
                  cols="30"
                  rows="4"
                  v-model="userBio"
                  maxlength="80"
                  class="w-full resize-none rounded-md border border-gray-300 bg-[#F1F1F2] py-2.5 px-3 text-gray-800 focus:outline-none"
                ></textarea>
                <div v-if="userBio" class="text-[11px] text-gray-500">
                  {{ userBio.length }}/80
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="h-[430px] w-full">
          <Cropper
            class="h-[430px]"
            ref="cropper"
            :stencil-component="CircleStencil"
            :src="uploadedImage"
          />
        </div>
      </div>

      <div
        id="ButtonSection"
        class="absolute left-0 bottom-0 w-full border-t border-t-gray-300 p-5"
      >
        <!-- Actions to update Info -->
        <div
          id="UpdateInfoButtons"
          v-if="!uploadedImage"
          class="flex items-center justify-end"
        >
          <button
            @click="$generalStore.isEditProfileOpen = false"
            class="flex items-center rounded-sm border px-3 py-[6px] hover:bg-gray-100"
          >
            <span class="px-2 text-[15px] font-medium">Cancel</span>
          </button>

          <button
            :disabled="!isUpdated"
            @click="updateUserInfo()"
            :class="!isUpdated ? 'bg-gray-200' : 'bg-[#F02C56]'"
            class="ml-3 flex items-center rounded-md border bg-[#F02C56] px-3 py-[6px] text-white"
          >
            <span class="mx-4 text-[15px] font-medium">Save</span>
          </button>
        </div>

        <!-- Actions to update Image Crooper -->
        <div id="CropperButtons" v-else class="flex items-center justify-end">
          <button
            @click="uploadedImage = null"
            class="flex items-center rounded-sm border px-3 py-[6px] hover:bg-gray-100"
          >
            <span class="px-2 text-[15px] font-medium">Cancel</span>
          </button>

          <button
            @click="cropAndUpdateImage()"
            class="ml-3 flex items-center rounded-md border bg-[#F02C56] px-3 py-[6px] text-white"
          >
            <span class="mx-4 text-[15px] font-medium">Apply</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
