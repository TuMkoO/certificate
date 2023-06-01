import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

export function useRegisterForm() {
  const store = useStore();
  const { handleSubmit, isSubmitting, submitCount, resetForm } = useForm();

  const PASSWORD_MIN_LENGTH = 7;

  onMounted(() => {
    registerRole.value = "user";
  });

  const {
    value: registerEmail,
    errorMessage: rEmailError,
    handleBlur: rEmailBlur,
  } = useField(
    "registerEmail",
    yup
      .string()
      .trim()
      .required("Пожалуйста, введите email")
      .email("Необходимо ввести корректный email")
  );

  const {
    value: registerPassword,
    errorMessage: rPasswordError,
    handleBlur: rPasswordBlur,
  } = useField(
    "registerPassword",
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
    value: registerName,
    errorMessage: rNameError,
    handleBlur: rNameBlur,
  } = useField(
    "registerName",
    yup
      .string()
      .trim()
      .required("Пожалуйста, введите имя")
      .min(5, "Имя не может быть меньше 5 символов")
  );

  const {
    value: registerRole,
    errorMessage: rRoleError,
    handleBlur: rRoleBlur,
  } = useField(
    "registerRole",
    yup.string().required("Пожалуйста, укажите права пользователя")
  );

  // количество кликов подряд по кнопке входа
  const isTooManyAttempts = computed(() => submitCount.value >= 3);

  // разблокировать кнопку входу через время
  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500);
    }
  });

  // функция регистрации
  const onRegisterSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch("auth/register", values);

      // очистка полей после успешной регистрации
      resetForm();
    } catch (e) {}
  });

  return {
    registerEmail,
    registerPassword,
    registerName,
    registerRole,
    rEmailError,
    rNameError,
    rPasswordError,
    rRoleError,
    rEmailBlur,
    rPasswordBlur,
    rNameBlur,
    rRoleBlur,
    onRegisterSubmit,
    isSubmitting,
    isTooManyAttempts,
  };
}
