import axios from "axios";

// Genera acceso global a nuestros stores
// const { $axios } = useNuxtApp();

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;
  return {
    provide: {
      axios: axios,
    },
  };
});
