<template>
  <div class="container">
    <div class="row">
      <slot />
    </div>
  </div>
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
