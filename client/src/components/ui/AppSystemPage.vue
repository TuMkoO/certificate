<template>
  <div class="container">
    <div class="row">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();

document.title = `${props.title} | Новые технологии`;

// export default {
//   props: {
//     title: {
//       type: String,
//       required: true,
//     },
//   },
//   setup(props) {
//     document.title = `${props.title} | Новые технологии`;
//   },
// };
</script>

<style></style>
