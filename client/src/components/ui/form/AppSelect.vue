<template>
  <div class="form-floating">
    <div class="close" v-if="value">
      <button class="btn-close" type="button" @click="clear"></button>
    </div>
    <select
      :id="name"
      aria-label=".form-select-lg"
      :class="['form-select', 'form-select-lg', { 'is-invalid': invalid }]"
      v-model="value"
      @change="select(value)"
    >
      <option selected disabled>{{ label }}</option>
      <option
        v-for="(option, idx) in options"
        :key="idx"
        :value="option.value"
        >{{ option.value }}</option
      >
    </select>
    <label :for="name">{{ label }}</label>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedDefault: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    invalid: {
      type: Boolean,
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const value = ref("");

    onMounted(() => {
      if (props.selectedDefault) {
        value.value = props.selectedDefault;
      }
    });

    const select = (value) => {
      emit("select", {
        value: value,
      });
    };

    const clear = () => {
      value.value = "";
      emit("select", {
        value: "",
      });
    };

    return {
      value,
      select,
      clear,
    };
  },
};
</script>

<style>
.close {
  position: absolute;
  top: 17px;
  right: 10px;
  background: #fff;
}
</style>
