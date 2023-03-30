import { useUserStore } from "~/store/user";

//Existen middleware de ruta y de servidor (nitro, parecido al interceptor de axios)
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (to.path !== "/" && !userStore.id) {
    return navigateTo("/");
  }
});
