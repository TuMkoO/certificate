<template>
  <app-loader v-if="loading"></app-loader>
  <main v-else class="d-flex flex-column">
    <TheNavbar />

    <router-view />

    <TheFooter />
    <AppMessage />
  </main>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import AppLoader from "../components/ui/AppLoader.vue";
import TheNavbar from "../components/TheNavbar";
import TheFooter from "../components/TheFooter";
import AppMessage from "../components/AppMessage";

export default {
  setup() {
    //store
    const store = useStore();
    //loader
    const loading = ref(false);

    onBeforeMount(async () => {
      loading.value = true;
      await store.dispatch("system/load");
      loading.value = false;
    });

    return {
      loading,
    };
  },
  components: { TheNavbar, TheFooter, AppMessage, AppLoader },
};
</script>

<style></style>
