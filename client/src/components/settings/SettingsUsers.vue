<template>
  <div class="auth-card card p-4">
    <ul class="nav nav-tabs" id="authTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="register-tab"
          data-bs-toggle="tab"
          data-bs-target="#register"
          type="button"
          role="tab"
          aria-controls="register"
          aria-selected="false"
        >
          Регистрация
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="users-tab"
          data-bs-toggle="tab"
          data-bs-target="#users"
          type="button"
          role="tab"
          aria-controls="users"
          aria-selected="false"
        >
          Пользователи
        </button>
      </li>
    </ul>
    <div class="tab-content" id="authContent">
      <div
        class="tab-pane fade show active"
        id="register"
        role="tabpanel"
        aria-labelledby="register-tab"
      >
        <div class="mt-3">
          <SettingsUsersForm
            :buttonTitle="'Регистрация'"
            :submitType="'register'"
            @success="updateUsers"
          ></SettingsUsersForm>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="users"
        role="tabpanel"
        aria-labelledby="users-tab"
      >
        <div class="mt-3">
          <div class="table-responsive">
            <table class="table table-sm table-bordered">
              <thead class="fs-7">
                <tr>
                  <th scope="col" class="text-center align-middle">Email</th>
                  <th scope="col" class="text-center align-middle">ФИО</th>
                  <th scope="col" class="text-center align-middle">Права</th>
                  <th scope="col" class="text-center align-middle">
                    Управление
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, idx) in users" :key="idx">
                  <td>{{ user.email }}</td>
                  <td>
                    {{ user.name }}
                  </td>
                  <td class="text-center align-middle">
                    <span
                      v-for="(role, roleIdx) in user.roles"
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
                  </td>

                  <td class="text-center">
                    <button
                      type="button"
                      @click="showModal(user)"
                      title="Изменить"
                      class="btn btn-outline-primary btn-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      @click="showModal(user, 'delete')"
                      class="ms-2 btn btn-outline-danger btn-sm"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Удалить"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <app-modal
        v-if="modal"
        title="Изменить данные пользователя"
        @close="closeModal"
      >
        <div class="modal-body">
          <p v-if="modalType == 'delete'">
            Учетная запись пользователя <b>{{ currentUser.name }}</b> будет
            удалена. Вы подтверждаете удаление?
          </p>
          <SettingsUsersForm
            v-else
            :buttonTitle="'Сохранить'"
            :submitType="'update'"
            :user="currentUser"
            @success="updateUsers"
          ></SettingsUsersForm>
        </div>
        <div v-if="modalType == 'delete'" class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="deleteUser(currentUser._id)"
          >
            Удалить
          </button>
          <button type="button" class="btn btn-danger" @click="closeModal">
            Отмена
          </button>
        </div>
      </app-modal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import AppModal from "../AppModal.vue";
import SettingsUsersForm from "./SettingsUsersForm.vue";

const store = useStore();
//Модальное окно
const modal = ref(false);

const modalType = ref("");

//Список пользователей
const users = ref([]);
const currentUser = ref();

onMounted(() => {
  users.value = store.getters["auth/users"];
});

function showModal(user, action) {
  modal.value = true;
  setTimeout(() => {
    let systemModal = document.getElementById("systemModal");
    systemModal.classList.add("show");
  }, 0);

  currentUser.value = user;

  if (action == "delete") {
    modalType.value = "delete";
  }
}

function closeModal() {
  modal.value = false;
  modalType.value = "";
}

async function updateUsers() {
  modal.value = false;

  await store.dispatch("auth/loadUsers");
  users.value = store.getters["auth/users"];
}

async function deleteUser(id) {
  await store.dispatch("auth/remove", id);

  await store.dispatch("auth/loadUsers");
  users.value = store.getters["auth/users"];

  modal.value = false;
  modalType.value = "";
}
</script>

<style></style>
