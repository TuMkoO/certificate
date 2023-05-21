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

    <button type="submit" class="btn btn-primary">
      Сохранить
    </button>
  </form>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  setup() {
    //подключаем store
    const store = useStore();
    //
    // const route = useRoute();
    const linkId = ref(null);

    //Vee-validate
    const { handleSubmit, isSubmitting, submitCount } = useForm();

    const { value: link, errorMessage: lError, handleBlur: lBlur } = useField(
      "link",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите базовую ссылку для Qr кода")
    );

    onMounted(() => {
      const qrLink = computed(() => store.getters["qr/qrs"]);

      link.value = qrLink.value[0].link;
      linkId.value = qrLink.value[0]._id;
    });

    // функция изменения
    const submit = handleSubmit(async (values) => {
      // console.log("link.value", link.value);
      // const id = props.qrlink._id;
      const id = linkId.value;

      try {
        await store.dispatch("qr/update", { values, id });
      } catch (e) {}
    });

    const onSubmit = handleSubmit(submit);

    return {
      link,
      lError,
      lBlur,
      linkId,
      onSubmit,
    };
  },
};
</script>

<style></style>
