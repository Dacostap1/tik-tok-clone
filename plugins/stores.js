import { useUserStore } from "~/store/user";
import { useProfileStore } from "~/store/profile";
import { useGeneralStore } from "~/store/general";

// Genera acceso global a nuestros stores
// const { $userStore } = useNuxtApp();

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      userStore: useUserStore(),
      profileStore: useProfileStore(),
      generalStore: useGeneralStore(),
    },
  };
});
