<template>
  <app-loader v-if="loading"></app-loader>
  <main v-else class="d-flex flex-column">
    <TheNavbar />

    <router-view />

    <TheFooter />
    <AppMessage />
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import AppLoader from "../components/ui/AppLoader.vue";
import TheNavbar from "../components/TheNavbar.vue";
import TheFooter from "../components/TheFooter.vue";
import AppMessage from "../components/AppMessage.vue";

//store
const store = useStore();
//loader
const loading = ref(false);

onBeforeMount(async () => {
  loading.value = true;
  await store.dispatch("system/load");
  loading.value = false;
});
</script>

<style></style>
