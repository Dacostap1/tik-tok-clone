import { defineStore } from "pinia";
import axios from "../plugins/axios";
const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    bio: "",
    image: "",
  }),
  getters: {
    isAuthenticated: (state) => state.id != "",
  },
  actions: {
    async getToken() {
      await $axios.get("/sanctum/csrf-cookie");
    },

    async login(email, password) {
      await $axios.post("/login", {
        email: email,
        password: password,
      });
    },

    async register(name, email, password, confirmPassword) {
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },

    async getUser() {
      try {
        const user = await $axios.get("/api/user");

        this.$state.id = user.data[0].id;
        this.$state.name = user.data[0].name;
        this.$state.email = user.data[0].email;
        this.$state.bio = user.data[0].bio;
        this.$state.image = user.data[0].image;
      } catch (error) {
        console.log(error);
      }
    },

    async updateUser(name, bio) {
      return await $axios.post("/api/user/update", {
        name,
        bio,
      });
    },

    async updateUserImage(data) {
      return await $axios.post("/api/user/update-image", data);
    },

    async createPost(data) {
      return await $axios.post("/api/posts", data);
    },

    async likePost(postId) {
      return await $axios.post("/api/likes", {
        post_id: postId,
      });
    },

    async unlikePost(likeId) {
      return await $axios.delete("/api/likes/" + likeId);
    },

    async logout() {
      await $axios.post("/logout");
      this.resetUser();
    },

    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.email = "";
      this.$state.bio = "";
      this.$state.image = "";
    },
  },
  persist: true,
});
