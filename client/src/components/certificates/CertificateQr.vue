<template>
  <div class="certificate-qr">
    <p>QR код:</p>
    <qrcode-vue :value="valueLink" :size="size" level="H" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, onBeforeMount, computed } from "vue";
import QrcodeVue from "qrcode.vue";

const props = defineProps<{ data: string[] }>();

const store = useStore();
const basicLink = computed(() => store.getters["qr/qrs"]);
const valueLink = ref<string>("");

const size = 150;

onBeforeMount(async () => {
  await store.dispatch("qr/load");

  valueLink.value =
    props.data[0] +
    " " +
    props.data[1] +
    " " +
    props.data[2] +
    "\n" +
    props.data[3] +
    " от " +
    props.data[4] +
    "\n" +
    "Проверить по ссылке: " +
    basicLink.value[0].link +
    "certificate/" +
    props.data[5] +
    "/";
});
</script>

<style></style>
