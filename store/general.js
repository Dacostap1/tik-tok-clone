import { defineStore } from "pinia";
import { useUserStore } from "./user";

import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null,
    ids: null,
    isBackUrl: "/",
    posts: null,
    suggested: null,
    following: null,
  }),
  actions: {
    activateOverflow(val) {
      console.log(val);
      document.body.style.overflow = val ? "hidden" : "visible";
    },
    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        (response) => {
          //Call was successfull, continue
          return response;
        },
        (error) => {
          switch (error.response.status) {
            case 401:
            case 419:
            case 503:
              useUserStore().resetUser();
              window.location.href = "/";
              break;
            case 500:
              alert("Oops, something went wrong!");
              break;
            default:
              return Promise.reject(error);
          }
        }
      );
    },
  },
  persist: true,
});
