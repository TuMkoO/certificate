<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container-xxl">
      <div class="text-muted">{{ systemData.footer.mainText }}</div>
      <div v-if="systemData.footer.secondaryText" class="text-muted">
        {{ systemData.footer.secondaryText }}
      </div>
      <a
        class="text-decoration-none"
        target="_blank"
        :href="systemData.footer.link"
        v-if="systemData.footer.linkTitle && systemData.footer.link"
        >{{ systemData.footer.linkTitle }}</a
      >
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const systemData = computed(() => store.getters["system/systems"]);

    return {
      systemData,
    };
  },
};
</script>

<style scoped></style>
