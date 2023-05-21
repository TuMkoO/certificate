import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useLoginForm() {
  const store = useStore();
  const router = useRouter();
  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const {
    value: loginEmail,
    errorMessage: lEmailError,
    handleBlur: lEmailBlur,
  } = useField(
    "loginEmail",
    yup
      .string()
      .trim()
      .required("Пожалуйста, введите email")
      .email("Необходимо ввести корректный email")
  );

  const PASSWORD_MIN_LENGTH = 6;

  const {
    value: loginPassword,
    errorMessage: lPasswordError,
    handleBlur: lPasswordBlur,
  } = useField(
    "loginPassword",
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
  //     setTimeout(() => (submitCount.value = 0), 30000);
  //   }
  // });

  const onLoginSubmit = handleSubmit(async (values) => {
    // console.log("isTooManyAttempts", isTooManyAttempts);
    try {
      // console.log("login-form.js --> onLoginSubmit() ");
      await store.dispatch("auth/login", values);

      router.push("/");
    } catch (e) {}
  });

  return {
    loginEmail,
    loginPassword,
    lEmailError,
    lPasswordError,
    lEmailBlur,
    lPasswordBlur,
    onLoginSubmit,
    isSubmitting,
    // isTooManyAttempts,
  };
}
