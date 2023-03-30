import { defineStore } from "pinia";
import { useUserStore } from "./user";

import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null,
    ids: [],
    posts: [],
    suggested: [],
    following: [],
    isBackUrl: "/",
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

    async getAllPosts() {
      const res = await $axios.get(`/api/posts`);
      this.posts = res.data;
    },

    //TODO: Solo trae ids por usuario pero desde el home deberian ser todos
    async getPostById(id) {
      const res = await $axios.get(`/api/posts/${id}`);

      this.$state.selectedPost = res.data.post[0];
      this.$state.ids = res.data.ids; //aqui
    },

    async addComment(postId, comment) {
      await $axios.post("/api/comments/", {
        post_id: postId,
        comment: comment,
      });

      await this.getPostById(postId);
    },

    async deleteComment(postId, commentId) {
      await $axios.delete(`/api/comments/${commentId}`, {
        post_id: postId,
      });

      await this.getPostById(postId);
    },

    async deletePost(postId) {
      return await $axios.delete(`/api/posts/${postId}`);
    },

    updateSideMenuImage(array, userStore) {
      array.forEach(function (value, i) {
        console.log("%d: %s", i, value);

        if (value.id == userStore.id) {
          value.image = userStore.image;
        }
      });
    },

    async setAxiosInterceptors() {
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
