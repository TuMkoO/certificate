<template>
  <app-system-page title="Авторизация">
    <div class="auth mx-auto">
      <img
        class="mx-auto d-block mb-5"
        src="../assets/img/logo-200.png"
        alt=""
      />
      <div class="auth-card p-3 card">
        <form @submit.prevent="onLoginSubmit">
          <div class="mb-3">
            <div class="form-floating mb-1">
              <input
                type="email"
                :class="['form-control', { 'is-invalid': lEmailError }]"
                id="loginEmail"
                aria-describedby="emailHelp"
                placeholder="name@example.com"
                v-model="loginEmail"
              />
              <label for="loginEmail" class="form-label">Email</label>
            </div>
            <div class="form-text text-danger mb-3" v-if="lEmailError">
              {{ lEmailError }}
            </div>
          </div>

          <div class="mb-3">
            <div class="form-floating mb-1">
              <input
                type="password"
                :class="['form-control', { 'is-invalid': lPasswordError }]"
                id="loginPassword"
                placeholder="Пароль"
                v-model="loginPassword"
              />
              <label for="loginPassword" class="form-label">Пароль</label>
            </div>
            <div class="form-text text-danger mb-3" v-if="lPasswordError">
              {{ lPasswordError }}
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Войти</button>
        </form>
      </div>
    </div>
  </app-system-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { error } from "../utils/error";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import AppSystemPage from "../components/ui/AppSystemPage.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const { handleSubmit } = useForm();

const PASSWORD_MIN_LENGTH = 7;

const { value: loginEmail, errorMessage: lEmailError } = useField(
  "loginEmail",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите email")
    .email("Необходимо ввести корректный email")
);

const { value: loginPassword, errorMessage: lPasswordError } = useField(
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

onMounted(() => {
  const localStorageToken = localStorage.getItem("token");

  if (localStorageToken) {
    router.push("/");
  }
});

if (route.query.message) {
  store.dispatch("setMessage", {
    value: error(route.query.message),
    type: "warning",
  });
}

const onLoginSubmit = handleSubmit(async (values) => {
  try {
    await store.dispatch("auth/login", values);

    router.push("/");
  } catch (e) {}
});
</script>

<style scoped></style>
