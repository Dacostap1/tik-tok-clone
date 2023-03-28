<script setup>
import MenuItem from "./MenuItem.vue";
import MenuItemFollow from "./MenuItemFollow.vue";

const { $generalStore, $userStore } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const isLoggedIn = (user) => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }

  setTimeout(() => router.push(`/profile/${user.id}`), 200);
};
</script>

<template>
  <div
    id="SideNavMain"
    :class="route.fullPath === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'"
    class="fixed z-20 h-full w-[75px] overflow-auto border-r bg-white pt-[70px] lg:border-r-0"
  >
    <div class="mx-auto w-[55px] lg:w-full">
      <nuxt-link to="">
        <MenuItem
          icon-string="For You"
          color-string="#F02C56"
          size-string="30"
        ></MenuItem>
      </nuxt-link>
      <MenuItem
        icon-string="Following"
        color-string="#00000"
        size-string="27"
      ></MenuItem>
      <MenuItem
        icon-string="Live"
        color-string="#00000"
        size-string="27"
      ></MenuItem>

      <div class="mt-2 border-b lg:ml-2"></div>

      <div
        class="hidden px-2 pt-4 pb-2 text-xs font-semibold text-gray-600 lg:block"
      >
        Suggested accounts
      </div>

      <div class="block pt-3 lg:hidden"></div>

      <div
        v-for="following in $generalStore.following"
        @click="isLoggedIn(following)"
        class="cursor-pointer"
      >
        <MenuItemFollow :user="following"></MenuItemFollow>
      </div>

      <button class="hidden pt-1.5 pl-2 text-[13px] text-[#F02C56] lg:block">
        See all
      </button>

      <div class="mt-2 border-b lg:ml-2"></div>

      <div
        class="hidden px-2 pt-4 pb-2 text-xs font-semibold text-gray-600 lg:block"
      >
        Following accounts
      </div>

      <div class="block pt-3 lg:hidden"></div>

      <div
        v-for="suggested in $generalStore.suggested"
        @click="isLoggedIn(suggested)"
        class="cursor-pointer"
      >
        <MenuItemFollow :user="suggested"></MenuItemFollow>
      </div>

      <button class="hidden pt-1.5 pl-2 text-[13px] text-[#F02C56] lg:block">
        See more
      </button>

      <div class="mt-2 hidden border-b lg:ml-2 lg:block" />

      <div class="hidden text-[11px] text-gray-500 lg:block">
        <div class="px-2 pt-4">
          About Newsroom TikTok Shop Contact Careers ByteDance
        </div>
        <div class="px-2 pt-4">
          TikTok for Good Advertise Developers Transparency TikTok Rewards
          TikTok Browse TikTok Embeds
        </div>
        <div class="px-2 pt-4">
          Help Safety Terms Privacy Creator Portal Community Guidelines
        </div>
        <div class="px-2 pt-4">© 2023 TikTok</div>
      </div>

      <div class="pb-14"></div>
    </div>
  </div>
</template>

<style scoped></style>
