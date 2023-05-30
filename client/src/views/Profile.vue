<template>
  <app-page title="Мой профиль">
    <div class="container">
      <div class="py-4">
        <h4 class="text-center mb-4">Мой профиль</h4>
      </div>
      <app-loader v-if="loading"></app-loader>
      <div v-else class="profile">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label for="inputEmail" class="form-label">Email</label>
                <input
                  type="email"
                  :class="['form-control', { 'is-invalid': eError }]"
                  id="inputEmail"
                  v-model="email"
                />
                <div v-if="eError" class="form-text text-danger">
                  {{ eError }}
                </div>
              </div>
              <div class="mb-3">
                <label for="inputName" class="form-label">Имя</label>
                <input
                  type="text"
                  :class="['form-control', { 'is-invalid': nError }]"
                  id="inputName"
                  v-model="name"
                />
                <div class="form-text text-danger" v-if="nError">
                  {{ nError }}
                </div>
              </div>
              <div class="mb-3">
                Уровень доступа:
                <span
                  v-for="(role, roleIdx) in roles"
                  :key="roleIdx"
                  :class="[
                    'badge',
                    'fw-normal',
                    { 'bg-danger': role == 'admin' },
                    { 'bg-primary': role == 'user' },
                    { 'bg-warning': role == 'god' },
                  ]"
                  >{{
                    role == "admin"
                      ? "Администратор"
                      : role == "user"
                      ? "Пользователь"
                      : role == "god"
                      ? "God"
                      : ""
                  }}</span
                >
              </div>
              <div class="mb-3">
                <router-link to="/password">Сменить пароль</router-link>
              </div>

              <button type="submit" class="btn btn-primary mt-3">
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";

//store
const store = useStore();
//loader
const loading = ref<boolean>(false);
//user
const user = computed(() => store.getters["auth/user"]);
//user role
const roles = ref<string[]>([]);

const { handleSubmit } = useForm();

const { value: email, errorMessage: eError } = useField(
  "email",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите email")
    .email("Необходимо ввести корректный email")
);

const { value: name, errorMessage: nError } = useField(
  "name",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите имя")
    .min(5, "Имя не может быть меньше 5 символов")
);

onMounted(async () => {
  loading.value = true;

  email.value = user.value.email;
  name.value = user.value.name;
  roles.value = user.value.roles;

  loading.value = false;
});

// функция обновления профиля
const onSubmit = handleSubmit(async (values) => {
  try {
    await store.dispatch("auth/update", { ...values, role: roles.value[0] });
  } catch (e) {}
});
</script>

<style></style>
