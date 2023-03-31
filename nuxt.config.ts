// Documentation
// https://nuxt.com/docs/api/configuration/nuxt-config
// https://tailwindcss.com/docs/guides/nuxtjs#3
// https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html

export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
  // ssr: false,
  pages: true,
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-icon", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  components: [
    { path: "~/components" },
    { path: "~/components/auth", extensions: ["vue"] },
    { path: "~/components/profile", extensions: ["vue"] },
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
