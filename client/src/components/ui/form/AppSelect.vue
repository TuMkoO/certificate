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
      <option v-for="(option, idx) in options" :key="idx" :value="option.value">
        {{ option.value }}
      </option>
    </select>
    <label :for="name">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ISelectValue } from "@/types/ISelectValue";

interface Option {
  value: string;
  _id: string;
  id: string;
}

const props = withDefaults(
  defineProps<{
    options: Option[];
    selectedDefault: string;
    label: string;
    name: string;
    invalid?: boolean;
  }>(),
  {
    options: () => [],
    selectedDefault: "",
    label: "",
    name: "",
  }
);

const emit = defineEmits<{
  (e: "select", value: ISelectValue): void;
}>();

const value = ref<string>("");

onMounted(() => {
  if (props.selectedDefault) {
    value.value = props.selectedDefault;
  }
});

const select = (value: string) => {
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
</script>

<style>
.close {
  position: absolute;
  top: 17px;
  right: 10px;
  background: #fff;
}
</style>
