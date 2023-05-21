<template>
  <header>
    <nav class="navbar navbar-light navbar-expand-lg bg-light fixed-top">
      <div class="container-xxl">
        <a class="navbar-brand" :href="systemData.link" target="_blank">{{
          systemData.brand
        }}</a>

        <button
          v-if="auth"
          class="navbar-toggler"
          type="button"
          data-bs-backdrop="false"
          @click="show"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          v-if="auth"
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="navbarOffcanvasLg"
          aria-labelledby="navbarOffcanvasLgLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Меню</h5>
            <button
              type="button"
              class="btn-close text-reset"
              @click="close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link" to="/" @click="close"
                  >Реестр</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/statistics" @click="close"
                  >Статистика</router-link
                >
              </li>
              <li class="nav-item" v-if="access">
                <router-link class="nav-link" to="/settings" @click="close"
                  >Настройки</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/profile" @click="close"
                  >Личный кабинет</router-link
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="logout">Выход</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-if="isShow"
          class="offcanvas-backdrop fade show"
          @click="close"
        ></div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = store.getters["auth/isAuthenticated"];
    const userRole = store.getters["auth/user"].roles;
    const isShow = ref(false);
    const access = ref(false);

    const systemData = computed(() => store.getters["system/systems"]);

    onMounted(() => {
      if (userRole) {
        userRole.includes("admin") || userRole.includes("god")
          ? (access.value = true)
          : (access.value = false);
      }
    });

    const show = () => {
      isShow.value = true;
      document.getElementById("navbarOffcanvasLg").classList.add("show");
    };

    const close = () => {
      document.getElementById("navbarOffcanvasLg").classList.remove("show");

      isShow.value = false;
    };

    return {
      //выход из приложения
      logout: async () => {
        await store.dispatch("auth/logout");
        router.push("/auth");
      },
      auth,
      userRole,
      access,
      isShow,
      show,
      close,
      systemData,
    };
  },
};
</script>

<style scoped></style>
