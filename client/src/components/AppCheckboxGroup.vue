<template>
  <div class="checkbox-group-wrapper">
    <slot />
    <fieldset class="checkbox-group">
      <legend>
        {{ title }}
        <div>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger font-family-default"
            @click="clear"
          >
            &times;
          </button>
        </div>
      </legend>

      <div class="checkbox-group-container">
        <label
          v-for="option in options"
          :key="option.id"
          class="form-check-label checkbox-group-item"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="option.value"
            v-model="checkbox"
            @change="check(checkbox)"
          />
          {{ option.value }}
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ICheckboxGroupOption } from "@/types/ICheckboxGroupOption";
import type { ICheckboxGroupValues } from "@/types/ICheckboxGroupValues";

const props = defineProps<{
  options: ICheckboxGroupOption[];
  title: string;
  defaultOptions?: string[] | undefined;
}>();

const emit = defineEmits<{
  (e: "checked", values: ICheckboxGroupValues): void;
}>();

const checkbox = ref<string[]>([]);

onMounted(() => {
  //если указаны дефольные значения
  if (props.defaultOptions && props.defaultOptions.length) {
    checkbox.value = props.defaultOptions;
  }
});

const check = (val: string[]) => {
  emit("checked", {
    values: val,
  });
};

const clear = () => {
  checkbox.value = [];

  emit("checked", {
    values: [],
  });
};
</script>

<style></style>
