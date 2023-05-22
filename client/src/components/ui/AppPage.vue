<template>
  <section class="mb-5">
    <slot />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

document.title = `${props.title} | Новые технологии`;
</script>

<style></style>
