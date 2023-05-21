<template>
  <div class="modal-backdrop fade show"></div>
  <div
    class="modal fade "
    id="systemModal"
    tabindex="-1"
    aria-labelledby="systemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="title" class="modal-title" id="systemModalLabel">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="$emit('close')"
          ></button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["close"],
  setup() {
    // const modal = ref(true);

    return {
      // modal,
    };
  },
};
</script>

<style scoped></style>
