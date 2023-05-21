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
          {{ mainItem[0] }}
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

<script>
import { computed, onMounted, ref } from "vue";

export default {
  props: {
    collapseId: { type: String, required: true },
    mainItem: { type: Array, required: true },
    items: { type: Array },
    defaultItems: { type: Array },
  },
  emits: ["checked"],
  setup(props, { emit }) {
    //дефолтное значение главное чекбокса
    const mainCheckbox = ref(false);

    //массив выбранных значений чекбоксов
    const checkbox = ref([]);

    const checkboxItems = ref([]);

    //
    const defaultItems = ref();

    onMounted(() => {
      checkboxItems.value = props.items.filter(
        (item) => item.owner == props.mainItem[1]
      );

      // console.log("props.defaultItems :: ", props.defaultItems);
      // console.log("props.defaultItems.values :: ", props.defaultItems.values);

      //дефолтные значения
      if (props.defaultItems) {
        defaultItems.value = props.defaultItems.find(
          (item) => item.item == props.mainItem[0]
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
          values: { item: props.mainItem[0] },
        });
      } else {
        //сбросить значения всех чекбоксов
        checkbox.value = [];
        emit("checked", {
          values: { item: props.mainItem[0], values: [] },
        });
      }
    };

    const check = (val) => {
      if (val.length) {
        emit("checked", {
          values: { item: props.mainItem[0], values: val },
        });
      } else {
        emit("checked", {
          values: { item: props.mainItem[0] },
        });
      }
    };

    return {
      mainCheckbox,
      checkbox,
      checkboxItems,
      classes,

      checkMainCheckbox,
      check,
    };
  },
};
</script>

<style></style>
