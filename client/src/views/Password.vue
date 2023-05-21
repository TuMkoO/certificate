<template>
  <app-page title="Сменить пароль">
    <div class="container">
      <div class="py-4">
        <h4 class="text-center mb-4">Сменить пароль</h4>
      </div>
      <div class="profile">
        <div class="row">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="oldPassword" class="form-label">Текущий пароль</label>
              <input
                type="password"
                :class="['form-control', { 'is-invalid': oError }]"
                id="oldPassword"
                placeholder="Введите ваш текущий пароль"
                v-model="oldPassword"
              />
              <div class="form-text text-danger" v-if="oError">
                {{ oError }}
              </div>
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Новый пароль</label>
              <input
                type="password"
                :class="['form-control', { 'is-invalid': nError }]"
                id="newPassword"
                placeholder="Введите ваш новый пароль"
                v-model="newPassword"
              />
              <div class="form-text text-danger" v-if="nError">
                {{ nError }}
              </div>
            </div>

            <button type="submit" class="btn btn-primary mt-3">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  </app-page>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import AppPage from "../components/ui/AppPage";
import AppLoader from "../components/ui/AppLoader.vue";

export default {
  setup() {
    //store
    const store = useStore();

    const { handleSubmit, isSubmitting, resetForm, submitCount } = useForm();

    const PASSWORD_MIN_LENGTH = 6;

    const {
      value: oldPassword,
      errorMessage: oError,
      handleBlur: oBlur,
    } = useField(
      "oldPassword",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите пароль")
        .min(
          PASSWORD_MIN_LENGTH,
          `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`
        )
    );
    const {
      value: newPassword,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField(
      "newPassword",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите пароль")
        .min(
          PASSWORD_MIN_LENGTH,
          `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`
        )
    );

    // количество кликов подряд по кнопке входа
    // const isTooManyAttempts = computed(() => submitCount.value >= 3);

    // разблокировать кнопку входу через время
    // watch(isTooManyAttempts, (val) => {
    //   if (val) {
    //     setTimeout(() => (submitCount.value = 0), 1500);
    //   }
    // });

    // функция обновления профиля
    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch("auth/updatePassword", values);

        // очистка полей после успешной регистрации
        resetForm();
      } catch (e) {}
    });

    return {
      oldPassword,
      newPassword,
      oError,
      nError,
      oBlur,
      nBlur,
      onSubmit,
      isSubmitting,
      // isTooManyAttempts,
    };
  },
  components: { AppPage, AppLoader },
};
</script>

<style></style>
