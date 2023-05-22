<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="headingId">
      <button
        :class="['accordion-button', { collapsed: !opened }]"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + collapseId"
        :aria-expanded="opened"
        :aria-controls="collapseId"
      >
        {{ placeholder }}
      </button>
    </h2>
    <div
      :id="collapseId"
      :class="['accordion-collapse', 'collapse', { show: opened }]"
      :aria-labelledby="headingId"
      data-bs-parent="#accordionCertificateSettings"
    >
      <div class="accordion-body">
        <div class="mb-3" v-if="itemsList">
          <select
            class="form-select"
            size="4"
            multiple
            aria-label="multiple select example"
            v-model="itemSelected"
          >
            <option v-if="itemsList.length === 0" disabled>
              Значений нет, добавьте новое
            </option>
            <option v-else disabled>Выберите значение</option>
            <option v-for="item in itemsList" :key="item.id" :value="item._id">
              {{ item.value }}
            </option>
          </select>

          <button
            class="btn btn-sm btn-outline-danger mt-2"
            type="button"
            @click="removeItem(itemSelected)"
          >
            Удалить
          </button>
        </div>
        <div class="input-group">
          <input
            type="text"
            :class="['form-control', { 'is-invalid': iError }]"
            :placeholder="placeholder"
            :aria-label="placeholder"
            aria-describedby="button-addon2"
            v-model="newItem"
            @blur="iBlur"
            @change="iChange"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            @click="onSubmitNewItem"
          >
            Добавить
          </button>
        </div>
        <div class="form-text text-danger" v-if="iError">
          {{ iError }}
        </div>

        <settings-certificate-fields-sub-item
          v-if="withItems"
          :itemsList="itemsList"
          storeLink="certificate-access-item"
          storeName="certAccessItems"
        >
        </settings-certificate-fields-sub-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import SettingsCertificateFieldsSubItem from "./SettingsCertificateFieldsSubItem.vue";

const props = defineProps<{
  storeLink: string;
  placeholder: string;
  errorText: string;
  storeName: string;
  headingId: string;
  collapseId: string;
  opened?: boolean;
  withItems?: boolean;
  itemsList: [];
}>();

//подключаем store
const store = useStore();
//
const itemsList = ref(null);
//выбранное значение из select
const itemSelected = ref([]);
//
const { handleSubmit, resetForm } = useForm();

const {
  value: newItem,
  errorMessage: iError,
  handleBlur: iBlur,
  handleChange: iChange,
} = useField("newItem", yup.string().trim().required(props.errorText));

onMounted(() => {
  itemsList.value = props.itemsList;
});

//добавить новое значение:
const submitNewItem = async (values) => {
  // link для url в БД на сервере
  const link = props.storeLink;

  // вызываем метод create для создания записи в БД
  await store.dispatch("certItem/create", { values, link });

  //обновить список:
  await store.dispatch(`certItem/load`, link);

  const items = computed(() => store.getters[`certItem/${props.storeName}`]);

  itemsList.value = items.value;

  //очистка поля ввода
  resetForm();
};

const onSubmitNewItem = handleSubmit(submitNewItem);

//удалить значение:
const removeItem = async (ids) => {
  if (ids.length) {
    // link для url в БД на сервере
    const link = props.storeLink;

    await ids.map((id) => {
      store.dispatch(`certItem/remove`, { id, link });

      //получаем подкатегории всех категорий
      const accessSubItems = computed(
        () => store.getters["certItem/certAccessItems"]
      );

      //если есть подкатегории
      if (accessSubItems.value.length) {
        //список подкатегорий на удаление:
        const subItemsToRemove = accessSubItems.value.filter(
          (item) => item.owner == id
        );

        //если есть подкатегории выбранной категории
        if (subItemsToRemove.length) {
          // link для url в БД на сервере
          const linkItem = "certificate-access-item";

          //удалить все подкатегории выбранной категории
          subItemsToRemove.map((item) => {
            store.dispatch(`certItem/remove`, {
              id: item._id,
              link: linkItem,
            });
          });
        }
      }
    });

    //обновить список:
    await store.dispatch(`certItem/load`, link);

    const items = computed(() => store.getters[`certItem/${props.storeName}`]);

    itemsList.value = items.value;

    //очистить список значений на удаление:
    itemSelected.value = [];
  } else {
    store.dispatch("setMessage", {
      value: "Не выбрано значение для удаления",
      type: "warning",
    });
  }
};
</script>

<style></style>
