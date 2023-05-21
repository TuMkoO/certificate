<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <div class="form-floating ">
        <input
          type="text"
          :class="['form-control', { 'is-invalid': bError }]"
          id="logo-text"
          placeholder="Текст логотипа"
          v-model="brand"
        />
        <label for="logo-text">Текст логотипа</label>
      </div>
      <div class="form-text text-danger" v-if="bError">
        {{ bError }}
      </div>
    </div>

    <div class="mb-3">
      <div class="form-floating">
        <input
          type="text"
          :class="['form-control', { 'is-invalid': lError }]"
          id="logo-link"
          placeholder="Ссылка логотипа"
          v-model="link"
        />
        <label for="logo-link">Ссылка в логотипе</label>
      </div>
      <div class="form-text text-danger" v-if="lError">
        {{ lError }}
      </div>
    </div>

    <div class="mb-3">
      <div class="form-floating">
        <input
          type="text"
          :class="['form-control', { 'is-invalid': ft1Error }]"
          id="footer-text1"
          placeholder="Основной текст в футере"
          v-model="footerText1"
        />
        <label for="footer-text">Основной текст в футере</label>
      </div>
      <div class="form-text text-danger" v-if="ft1Error">
        {{ ft1Error }}
      </div>
    </div>

    <div class="mb-3">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="footer-text2"
          placeholder="Вторая строка текста в футере"
          v-model="footerText2"
        />
        <label for="footer-text">Вторая строка текста в футере</label>
      </div>
    </div>

    <div class="mb-3">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="footer-link"
          placeholder="Ссылка в футере"
          v-model="footerLink"
        />
        <label for="footer-text">Ссылка в футере</label>
      </div>
    </div>

    <div class="mb-3">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="footer-link-title"
          placeholder="Заголовок ссылки в футере"
          v-model="footerLinkTitle"
        />
        <label for="footer-text">Заголовок ссылки в футере</label>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">
      Сохранить
    </button>
  </form>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  props: {
    system: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    //подключаем store
    const store = useStore();

    const footerText2 = ref("");
    const footerLink = ref("");
    const footerLinkTitle = ref("");

    //Vee-validate
    const { handleSubmit } = useForm();

    const { value: link, errorMessage: lError, handleBlur: lBlur } = useField(
      "link",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите ссылку для логотипа")
    );
    const { value: brand, errorMessage: bError, handleBlur: bBlur } = useField(
      "brand",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите название Организации")
    );
    const {
      value: footerText1,
      errorMessage: ft1Error,
      handleBlur: ft1Blur,
    } = useField(
      "footerText1",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите текст для футера")
    );

    onMounted(() => {
      // console.log(props.system);
      brand.value = props.system.brand;
      link.value = props.system.link;
      footerText1.value = props.system.footer.mainText;
      props.system.footer.secondaryText
        ? (footerText2.value = props.system.footer.secondaryText)
        : (footerText2.value = "");
      props.system.footer.link
        ? (footerLink.value = props.system.footer.link)
        : (footerLink.value = "");
      props.system.footer.linkTitle
        ? (footerLinkTitle.value = props.system.footer.linkTitle)
        : (footerLinkTitle.value = "");
    });

    // функция изменения
    const submit = handleSubmit(async () => {
      const id = props.system._id;
      const values = {
        brand: brand.value,
        link: link.value,
        footer: {
          mainText: footerText1.value,
          secondaryText: footerText2.value,
          link: footerLink.value,
          linkTitle: footerLinkTitle.value,
        },
      };

      try {
        await store.dispatch("system/update", { values, id });
      } catch (e) {}
    });

    const onSubmit = handleSubmit(submit);

    return {
      link,
      lError,
      lBlur,
      brand,
      bError,
      bBlur,
      footerText1,
      ft1Error,
      ft1Blur,
      footerText2,
      footerLink,
      footerLinkTitle,

      onSubmit,
    };
  },
};
</script>

<style></style>
