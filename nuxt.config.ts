// Documentation
// https://nuxt.com/docs/api/configuration/nuxt-config
// https://tailwindcss.com/docs/guides/nuxtjs#3
// https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html

export default defineNuxtConfig({
  pages: true,
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-icon", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
