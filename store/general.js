import { defineStore } from "pinia";

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
    suggested: [],
    following: [],
  }),
  actions: {
    activateOverflow(val) {
      console.log(val);
      document.body.style.overflow = val ? "hidden" : "visible";
    },
    setBackUrl(url) {
      this.isBackUrl = url;
    },

    async getRandomUsers() {
      let res = await $axios.get(`/api/get-random-users`);

      this.suggested = res.data.suggested;
      this.following = res.data.following;
    },

    updateSideMenuImage(array, userStore) {
      array.forEach(function (value, i) {
        console.log("%d: %s", i, value);

        if (value.id == userStore.id) {
          value.image = userStore.image;
        }
      });
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
              // useUserStore().resetUser();
              // window.location.href = "/";
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
});
