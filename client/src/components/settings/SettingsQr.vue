<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <div class="form-floating">
        <input
          type="text"
          :class="['form-control', { 'is-invalid': lError }]"
          id="qr-link"
          placeholder="Базовая ссылка в QR коде"
          v-model="link"
        />
        <label for="qr-link">Базовая ссылка в QR коде</label>
      </div>
      <div class="form-text text-danger" v-if="lError">
        {{ lError }}
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Сохранить</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

//подключаем store
const store = useStore();

// const route = useRoute();
const linkId = ref(null);

//Vee-validate
const { handleSubmit } = useForm();

const { value: link, errorMessage: lError } = useField(
  "link",
  yup.string().trim().required("Пожалуйста, введите базовую ссылку для Qr кода")
);

onMounted(() => {
  const qrLink = computed(() => store.getters["qr/qrs"]);

  link.value = qrLink.value[0].link;
  linkId.value = qrLink.value[0]._id;
});

// функция изменения
const onSubmit = handleSubmit(async (values) => {
  const id = linkId.value;

  try {
    await store.dispatch("qr/update", { values, id });
  } catch (e) {}
});
</script>

<style></style>
