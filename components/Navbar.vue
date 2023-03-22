<script setup>
const route = useRoute();

const { $userStore, $generalStore } = useNuxtApp();
const showMenu = ref(false);
</script>

<template>
  <div
    id="navbar"
    class="fixed z-30 flex h-[61px] w-full items-center border-b bg-white"
  >
    <div
      :class="route.fullPath === '/' ? 'max-w-[1150px]' : ''"
      class="mx-auto flex w-full items-center justify-between px-6"
    >
      <div :class="route.fullPath === '/' ? 'w-[80%]' : 'w-[70%] lg:w-[20%]'">
        <nuxt-link to="/">
          <img width="115" src="~/assets/images/tiktok-logo.png" alt="" />
        </nuxt-link>
      </div>

      <!-- Buscador -->
      <div
        class="hidden w-full max-w-[380px] items-center rounded-full bg-[#f1f1f2] p-1 md:flex"
      >
        <input
          type="text"
          class="my-2 w-full bg-transparent pl-3 text-[15px] placeholder-[#838383] focus:outline-none"
          placeholder="Search account"
        />
        <div class="flex items-center border-l border-l-gray-300 px-3 py-1">
          <Icon name="ri:search-line" color="#A1A2A7" size="22"></Icon>
        </div>
      </div>

      <div
        class="flex w-full min-w-[275px] max-w-[320px] items-center justify-end gap-3"
      >
        <button
          class="flex items-center rounded-sm border px-3 py-[6px] hover:bg-gray-100"
        >
          <Icon name="mdi:plus" color="#000000" size="22"></Icon>
          <span class="px-2 text-[15px] font-medium">Upload</span>
        </button>

        <div v-if="!$userStore.id" class="flex items-center">
          <button
            @click="$generalStore.isLoginOpen = true"
            class="flex items-center rounded-md border bg-[#F02c56] px-3 py-[6px] text-white"
          >
            <span class="mx-4 text-[15px] font-medium">Login</span>
          </button>
          <Icon name="mdi:dots-vertical" color="#161724" size="22"></Icon>
        </div>

        <div v-else class="flex items-center">
          <Icon
            class="ml-1 mr-4"
            name="carbon:send-alt"
            color="#161724"
            size="30"
          ></Icon>
          <Icon
            class="mr-5"
            name="bx:message-detail"
            color="#161724"
            size="27"
          ></Icon>
          <div class="relative">
            <button @click="showMenu = !showMenu" class="mt-1">
              <img
                class="rounded-full"
                width="33"
                src="https://picsum.photos/id/83/300/320"
                alt=""
              />
            </button>

            <!-- Menu flotante -->
            <div
              v-if="showMenu"
              id="PopupMenu"
              class="absolute top-[43px] -right-2 w-[200px] rounded-lg border bg-white py-1.5 shadow-xl"
            >
              <nuxt-link
                @click="showMenu = false"
                class="flex cursor-pointer items-center justify-start py-3 px-2 hover:bg-gray-100"
              >
                <Icon name="ph:user" size="20"></Icon>
                <span class="pl-2 text-sm font-semibold">Profile</span>
              </nuxt-link>
              <div
                @click="showMenu = false"
                class="flex cursor-pointer items-center justify-start border-t py-3 px-1.5 hover:bg-gray-100"
              >
                <Icon name="ic:outline-login" size="20"></Icon>
                <span class="pl-2 text-sm font-semibold">Log out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
