<template>
  <div class="card p-3 mb-3">
    <a
      class="main-checkbox-btn"
      data-bs-toggle="collapse"
      :href="'#' + collapseId"
      role="button"
      :aria-expanded="false"
      :aria-controls="collapseId"
      @click="checkMainCheckbox"
    >
      <div class="main-checkbox-title">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="mainCheckbox"
        />
        <label class="form-check-label d-block">
          {{ mainItem.value }}
        </label>
      </div>
    </a>
    <div v-if="checkboxItems.length" :class="classes" :id="collapseId">
      <div class="card card-body py-2 px-3">
        <label
          class="form-check-label"
          v-for="item in checkboxItems"
          :key="item.id"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="item.value"
            v-model="checkbox"
            @change="check(checkbox)"
          />
          {{ item.value }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { ICheckboxDropdownCheckedValues } from "@/types/ICheckboxDropdownCheckedValues";
import type { ICheckboxDropdownDefaultItem } from "@/types/ICheckboxDropdownDefaultItem";
import type { ICheckboxDropdownItem } from "@/types/ICheckboxDropdownItem";

// interface CheckboxDropdownItem {
//   value: string;
//   owner: string;
//   id: string;
//   _id: string;
// }
// interface CheckboxDropdownDefaultItem {
//   item: string;
//   values: string[];
// }
// interface CheckboxDropdownCheckedValues {
//   values: {
//     item: string;
//     values?: string[];
//   };
// }
interface CheckboxDropdownMainItem {
  value: string;
  id: string;
}

const props = defineProps<{
  collapseId: string;
  mainItem: CheckboxDropdownMainItem;
  items: ICheckboxDropdownItem[];
  defaultItems?: ICheckboxDropdownDefaultItem[];
}>();

const emit = defineEmits<{
  (e: "checked", values: ICheckboxDropdownCheckedValues): void;
}>();

//дефолтное значение главного чекбокса
const mainCheckbox = ref<boolean>(false);

//массив выбранных значений чекбоксов
const checkbox = ref<string[]>([]);

//все значения
const checkboxItems = ref<ICheckboxDropdownItem[]>([]);

//дефолтные значения по умолчанию
const defaultItems = ref<ICheckboxDropdownDefaultItem>();

onMounted(() => {
  checkboxItems.value = props.items;

  //дефолтные значения
  if (props.defaultItems) {
    defaultItems.value = props.defaultItems.find(
      (item) => item.item == props.mainItem.value
    );

    if (defaultItems.value) {
      mainCheckbox.value = true;
      checkbox.value = defaultItems.value.values;
    }
  }
});

const classes = computed(() => {
  if (props.defaultItems && defaultItems.value) {
    return ["collapse", "show"];
  } else {
    return ["collapse"];
  }
});

const checkMainCheckbox = () => {
  mainCheckbox.value = !mainCheckbox.value;

  if (mainCheckbox.value) {
    emit("checked", {
      values: { item: props.mainItem.value },
    });
  } else {
    //сбросить значения всех чекбоксов
    checkbox.value = [];
    emit("checked", {
      values: { item: props.mainItem.value, values: [] },
    });
  }
};

const check = (val: string[]) => {
  if (val.length) {
    emit("checked", {
      values: { item: props.mainItem.value, values: val },
    });
  } else {
    emit("checked", {
      values: { item: props.mainItem.value },
    });
  }
};
</script>

<style></style>
