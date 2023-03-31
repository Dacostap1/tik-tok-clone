import axios from "axios";

// Genera acceso global a nuestros stores
// const { $axios } = useNuxtApp();

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.withCredentials = true;
  return {
    provide: {
      axios: axios,
    },
  };
});
