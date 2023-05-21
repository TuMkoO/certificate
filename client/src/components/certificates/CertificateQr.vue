<template>
  <div class="certificate-qr">
    <p>QR код:</p>
    <qrcode-vue :value="valueLink" :size="size" level="H" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onBeforeMount, computed } from "vue";
import QrcodeVue from "qrcode.vue";

export default {
  props: ["data"],
  setup(props) {
    const store = useStore();
    const basicLink = ref(null);
    const valueLink = ref("");

    const size = 150;

    onBeforeMount(async () => {
      await store.dispatch("qr/load");
      basicLink.value = computed(() => store.getters["qr/qrs"]);

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
        basicLink.value.value[0].link +
        "certificate/" +
        props.data[5] +
        "/";
    });

    return {
      valueLink,
      size,
    };
  },
  components: { QrcodeVue },
};
</script>

<style></style>
