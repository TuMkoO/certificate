<template>
  <div v-if="message" class="position-fixed top-0 end-0 p-3 z-index-1040">
    <div
      id="system-message"
      :class="[
        'toast',
        'align-items-center',
        'text-white',
        'border-0',
        { 'bg-primary': message.type == 'primary' },
        { 'bg-danger': message.type == 'danger' },
        { 'bg-warning': message.type == 'warning' },
      ]"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ message.value }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import type { Message, MessageTypes } from "@/types/MessageTypes";

const store = useStore();

// const messageTypes: MessageTypes = {
//   primary: "primary",
//   danger: "danger",
//   warning: "warning",
// };

const message = computed<Message>(() => store.state.message);
// const messageType = computed(() =>
//   message.value ? messageTypes[message.value.type] : null
// );

const close = () => store.commit("clearMessage");
</script>

<style scoped>
#system-message {
  display: block;
}
</style>
