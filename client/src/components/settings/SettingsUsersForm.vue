<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        :class="['form-control', { 'is-invalid': eError }]"
        id="email"
        aria-describedby="emailHelp"
        placeholder="name@example.com"
        v-model="email"
      />
      <div class="form-text text-danger" v-if="eError">
        {{ eError }}
      </div>
    </div>
    <div class="mb-3">
      <label for="fio" class="form-label">ФИО</label>
      <input
        type="text"
        :class="['form-control', { 'is-invalid': nError }]"
        id="fio"
        aria-describedby="emailHelp"
        placeholder="ФИО"
        v-model="name"
      />
      <div class="form-text text-danger" v-if="nError">
        {{ nError }}
      </div>
    </div>
    <div v-if="submitType == 'register'" class="mb-3">
      <label for="password" class="form-label">Пароль</label>
      <input
        type="password"
        :class="['form-control', { 'is-invalid': pError }]"
        id="password"
        placeholder="Пароль"
        v-model="password"
      />
      <div class="form-text text-danger" v-if="pError">
        {{ pError }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Права пользователя</label>
      <select
        :class="['form-select', { 'is-invalid': rError }]"
        aria-label="Roles"
        v-model="role"
      >
        <option value="user" selected>Пользователь</option>
        <option value="admin">Администратор</option>
      </select>
      <div class="form-text text-danger" v-if="rError">
        {{ rError }}
      </div>
    </div>
    <button type="submit" class="btn btn-primary">
      {{ buttonTitle }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import type { IUser } from "@/types/IUser";

const props = defineProps<{
  buttonTitle: string;
  submitType: string;
  user?: IUser;
}>();

const emit = defineEmits<{
  (e: "success"): void;
}>();

const store = useStore();

const { handleSubmit, resetForm } = useForm();

const PASSWORD_MIN_LENGTH = 7;

onMounted(() => {
  role.value = "user";

  if (props.user && props.user.roles?.length) {
    email.value = props.user.email;
    name.value = props.user.name;
    role.value = props.user.roles[0];
  }
});

const { value: email, errorMessage: eError } = useField(
  "email",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите email")
    .email("Необходимо ввести корректный email")
);

const { value: password, errorMessage: pError } = useField(
  "password",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите пароль")
    .min(
      PASSWORD_MIN_LENGTH,
      `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`
    )
);

const { value: name, errorMessage: nError } = useField(
  "name",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите имя")
    .min(5, "Имя не может быть меньше 5 символов")
);

const { value: role, errorMessage: rError } = useField(
  "role",
  yup.string().required("Пожалуйста, укажите права пользователя")
);

//Обработка ошибок формы при регистрации ==> Редактирование пользователя
async function onInvalidSubmit({ values, errors, results }) {
  if (
    props.submitType == "update" &&
    errors.password &&
    values.email &&
    values.name &&
    values.role
  ) {
    await store.dispatch("auth/updateById", {
      email: values.email,
      name: values.name,
      role: values.role,
      id: props.user?.id,
    });

    emit("success");

    store.dispatch("setMessage", {
      value: "Данные пользователя успешно обновлены",
      type: "primary",
    });
    //закрыть модальное окно
    // closeModal();
  } else {
    store.dispatch("setMessage", {
      value: "Не все поля заполнены. Введите значения",
      type: "warning",
    });
  }
}

// функция регистрации
const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.submitType == "register") {
      await store.dispatch("auth/register", values);

      emit("success");

      // очистка полей после успешной регистрации
      resetForm();
      role.value = "user";
    }
  } catch (e) {}
}, onInvalidSubmit);
</script>

<style></style>
