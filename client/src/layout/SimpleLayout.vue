<template>
  <app-loader v-if="loading"></app-loader>
  <main v-else class="d-flex flex-column">
    <section class="h-100 d-flex align-items-center">
      <router-view />
    </section>

    <TheFooter :info="systemSettings" />
    <AppMessage />
  </main>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import AppLoader from "../components/ui/AppLoader.vue";
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

    const systemSettings = computed(() => store.getters["system/systems"]);
    return {
      loading,
      systemSettings,
    };
  },
  components: { TheFooter, AppMessage, AppLoader },
};
</script>

<style></style>
