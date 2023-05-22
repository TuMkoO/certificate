<template>
  <SimpleLayout v-if="layout == 'simple' && !loading" />
  <MainLayout v-if="layout == 'main' && !loading" />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import MainLayout from "./layout/MainLayout.vue";
import SimpleLayout from "./layout/SimpleLayout.vue";

const route = useRoute();
const router = useRouter();
//store
const store = useStore();
//loading
const loading = ref(false);

const layout = computed(() => route.meta.layout);

console.log(route.meta.layout);

//проверка авторизации пользователя при входе на сайт
onBeforeMount(async () => {
  loading.value = true;

  //если есть Токен в localstorage
  if (localStorage.getItem("token")) {
    await store.dispatch("auth/checkAuth");

    //получаем права текущего пользователя
    const userRole = store.getters["auth/user"].roles;

    //проверка прав доступа
    if (userRole && route.meta.access) {
      userRole.forEach((role) => {
        if (
          !route.meta.access.includes(role) &&
          route.fullPath !== "/privacy-policy"
        ) {
          store.dispatch("setMessage", {
            value: "У вас недостаточно прав доступа",
            type: "danger",
          });

          router.push("/");
        }
      });
    }
  }

  loading.value = false;
});
</script>
<style lang="scss"></style>
