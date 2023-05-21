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
    //loader
    const loading = ref(false);
    //user
    const user = ref(null);
    //user id
    const id = ref(null);
    //user role
    const roles = ref(null);

    const { handleSubmit, isSubmitting, submitCount } = useForm();

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
      "email",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите email")
        .email("Необходимо ввести корректный email")
    );

    const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
      "name",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите имя")
        .min(5, "Имя не может быть меньше 5 символов")
    );

    // количество кликов подряд по кнопке входа
    // const isTooManyAttempts = computed(() => submitCount.value >= 3);

    // разблокировать кнопку входу через время
    // watch(isTooManyAttempts, (val) => {
    //   if (val) {
    //     setTimeout(() => (submitCount.value = 0), 1500);
    //   }
    // });

    onMounted(async () => {
      loading.value = true;

      id.value = store.getters["auth/user"].id;
      // console.log("id.value :::", id.value);
      if (!id.value) {
        id.value = await store.dispatch("auth/loadCurrentUserId");
      }
      user.value = await store.dispatch("auth/loadUserById", id.value);

      email.value = user.value.email;
      name.value = user.value.name;
      roles.value = user.value.roles;

      loading.value = false;
    });

    // функция обновления профиля
    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch("auth/update", values);
      } catch (e) {}
    });

    return {
      user,
      loading,

      email,
      name,
      eError,
      nError,
      eBlur,
      nBlur,
      roles,
      onSubmit,
      isSubmitting,
      // isTooManyAttempts,
    };
  },
  components: { AppPage, AppLoader },
};
</script>

<style></style>
