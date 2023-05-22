<template>
  <div class="modal-backdrop fade show"></div>
  <div
    class="modal fade"
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

<script setup lang="ts">
const props = defineProps<{ title: string }>();
const emits = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped></style>
