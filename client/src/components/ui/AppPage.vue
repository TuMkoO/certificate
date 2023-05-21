<template>
  <section class="mb-5">
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    document.title = `${props.title} | Университетские технологии`;
  },
};
</script>

<style></style>
