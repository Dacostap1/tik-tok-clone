import axios from "axios";

// Genera acceso global a nuestros stores
// const { $axios } = useNuxtApp();

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:8001";
  return {
    provide: {
      axios: axios,
    },
  };
});
