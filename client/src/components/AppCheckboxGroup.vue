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

const props = defineProps<{
  options: [];
  title: string;
  defaultOptions?: object;
}>();
const emit = defineEmits<{
  (e: "checked"): void;
}>();

//массив всех начальных значений
const checkboxItems = ref([]);

const checkbox = ref([]);

onMounted(() => {
  // console.log("props.defaultOptions ::", props.defaultOptions);

  //если указаны дефольные значения
  if (props.defaultOptions && props.defaultOptions.length) {
    checkbox.value = props.defaultOptions;
  }
});

const check = (val) => {
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
