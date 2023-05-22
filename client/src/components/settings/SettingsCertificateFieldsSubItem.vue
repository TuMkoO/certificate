<template>
  <div class="sub-item">
    <div class="certificate-form-field-title mt-4 mb-2">
      <span>Подгруппы:</span>
    </div>
    <div class="mb-3">
      <div>
        <label
          class="d-block"
          v-for="item in itemsList"
          :key="item.id"
          :value="item._id"
        >
          <input
            type="radio"
            :id="'one' + item.id"
            :value="item._id"
            v-model="certAccess"
          />
          {{ item.value }}
        </label>
      </div>
    </div>
    <div class="mb-3" v-if="itemsList">
      <select
        class="form-select"
        size="4"
        multiple
        aria-label="multiple select example"
        v-model="subItemSelected"
      >
        <option v-if="certAccess == 0" disabled>
          Выберите значение основной группы
        </option>
        <option v-else-if="filteredAccessSubItems == 0" disabled>
          Значений нет, добавьте новое
        </option>
        <option v-else disabled>Выберите значение</option>
        <option
          v-for="subItem in filteredAccessSubItems"
          :key="subItem.id"
          :value="subItem._id"
        >
          {{ subItem.value }}
        </option>
      </select>

      <button
        class="btn btn-sm btn-outline-danger mt-2"
        type="button"
        @click="removeSubItem(subItemSelected)"
      >
        Удалить
      </button>
    </div>

    <div class="input-group mt-3">
      <input
        type="text"
        :class="['form-control', { 'is-invalid': subError }]"
        placeholder="Добавить подгруппу"
        aria-label="Добавить подгруппу"
        aria-describedby="button-addon3"
        v-model="newSubItem"
        @blur="subBlur"
        @change="subChange"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon3"
        @click="onSubmitNewSubItem"
      >
        Добавить подгруппу
      </button>
    </div>
    <div class="form-text text-danger" v-if="subError">
      {{ subError }}
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  props: ["itemsList", "storeLink", "storeName"],
  setup(props) {
    //подключаем store
    const store = useStore();

    //выбранное значение из select
    const subItemSelected = ref([]);
    //значение выбранного radiobutton
    const certAccess = ref("");
    //
    const accessSubItems = ref();
    //filtered
    const filteredAccessSubItems = ref();

    const { isSubmitting, handleSubmit, resetForm } = useForm();

    const {
      value: newSubItem,
      errorMessage: subError,
      handleBlur: subBlur,
      handleChange: subChange,
    } = useField(
      "newSubItem",
      yup.string().trim().required("Введите подгруппу")
    );

    onMounted(() => {
      accessSubItems.value = [];

      //получаем подкатегории всех категорий
      const accessSub = computed(
        () => store.getters["certItem/certAccessItems"]
      );

      //заносим значение в массив accessSubItems
      accessSub.value.forEach((item) => {
        accessSubItems.value.push(item);
      });
    });

    watch(certAccess, (val) => {
      //очистить список значений на удаление:
      subItemSelected.value = [];

      filteredAccessSubItems.value = accessSubItems.value.filter(
        (item) => item.owner == val
      );
    });

    //добавить новое значение подгруппы:
    const submitNewSubItem = async (values) => {
      if (certAccess.value) {
        // link для url в БД на сервере
        const link = props.storeLink;

        // вызываем метод create для создания записи в БД
        await store.dispatch("certItem/createSub", {
          values,
          link,
          certAccessId: certAccess.value,
        });

        //обновить список:
        await store.dispatch("certItem/load", link);

        const subItems = computed(
          () => store.getters[`certItem/${props.storeName}`]
        );

        filteredAccessSubItems.value = subItems.value.filter(
          (item) => item.owner == certAccess.value
        );

        accessSubItems.value = subItems.value;

        //очистка поля ввода
        resetForm();
      } else {
        store.dispatch("setMessage", {
          value: "Не выбрано значение основной группы",
          type: "warning",
        });
      }
    };

    const onSubmitNewSubItem = handleSubmit(submitNewSubItem);

    //удалить значение:
    const removeSubItem = async (ids) => {
      if (ids.length) {
        // link для url в БД на сервере
        const link = props.storeLink;

        await ids.forEach((id) => {
          store.dispatch(`certItem/remove`, { id, link });
        });

        //обновить список:
        await store.dispatch("certItem/load", link);

        const subItems = computed(
          () => store.getters[`certItem/${props.storeName}`]
        );

        filteredAccessSubItems.value = subItems.value.filter(
          (item) => item.owner == certAccess.value
        );

        accessSubItems.value = subItems.value;

        //очистить список значений на удаление:
        subItemSelected.value = [];
      } else {
        store.dispatch("setMessage", {
          value: "Не выбрано значение для удаления",
          type: "warning",
        });
      }
    };

    return {
      removeSubItem,
      subItemSelected,
      isSubmitting,
      onSubmitNewSubItem,
      certAccess,
      accessSubItems,
      filteredAccessSubItems,
      newSubItem,
      subError,
      subBlur,
      subChange,
      resetForm,
    };
  },
};
</script>

<style></style>
