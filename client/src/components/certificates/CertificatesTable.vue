<template>
  <div>
    <h5 v-if="certificates.length === 0" class="text-center">
      Удостоверения не найдены
    </h5>
    <div v-else>
      <div class="certificates-list">
        <div class="row">
          <div class="certificates-content table-responsive">
            <table class="table table-sm table-bordered">
              <thead class="fs-7">
                <tr>
                  <th scope="col" class="text-center align-middle">
                    Номер удостоверения
                  </th>
                  <th scope="col" class="text-center align-middle">ФИО</th>
                  <th scope="col" class="text-center align-middle">Клеймо</th>
                  <th scope="col" class="text-center align-middle">
                    Способ сварки
                  </th>
                  <th scope="col" class="text-center align-middle">
                    Группа технических устройств
                  </th>
                  <th scope="col" class="text-center align-middle">
                    Срок аттестации
                  </th>

                  <th scope="col" class="text-center align-middle">Протокол</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cert in paginatedData" :key="cert._id">
                  <td>{{ cert.numCertificate }}</td>
                  <td>
                    {{
                      cert.firstname +
                      " " +
                      cert.secondname +
                      " " +
                      cert.lastname
                    }}
                  </td>
                  <td>{{ cert.stigmaGeneral }}</td>
                  <td>{{ cert.weldingMethodScope }}</td>
                  <td>
                    {{ arrayFormat(shortingTableItems(cert.accesses)) + "" }}
                  </td>
                  <td>
                    {{ dateFormat(cert.expiration) }}
                    <p
                      class="text-danger fs-7 mb-0"
                      v-if="new Date(cert.expiration) < new Date()"
                    >
                      не действует
                    </p>
                  </td>

                  <td class="text-center">
                    <router-link
                      v-slot="{ navigate }"
                      :to="{
                        name: 'Certificate',
                        params: { id: cert.owner ? cert.owner : cert._id },
                      }"
                    >
                      <button
                        type="button"
                        @click="navigate"
                        class="btn btn-outline-primary btn-sm"
                      >
                        Открыть
                      </button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="certificates-list-nav">
            <p>Найдено записей: {{ certificates.length }}</p>
            <nav
              aria-label="Page navigation example"
              v-if="certificates.length > perPage || currentPage > 1"
            >
              <ul class="pagination" v-if="pages.length">
                <li class="page-item">
                  <button
                    class="page-link"
                    type="button"
                    aria-label="First"
                    @click="onClickFirstPage"
                    :disabled="isInFirstPage"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>

                <li class="page-item">
                  <button
                    class="page-link"
                    type="button"
                    aria-label="Previous"
                    @click="onClickPreviousPage"
                    :disabled="isInFirstPage"
                  >
                    <span aria-hidden="true">&#8249;</span>
                  </button>
                </li>
                <li
                  :class="['page-item', { active: isPageActive(page.number) }]"
                  v-for="(page, index) in pages"
                  :key="index"
                >
                  <button
                    class="page-link"
                    type="button"
                    @click="onClickPage(page.number)"
                    :disabled="page.isDisabled"
                  >
                    {{ page.number }}
                  </button>
                </li>

                <li class="page-item">
                  <button
                    class="page-link"
                    type="button"
                    aria-label="Next"
                    @click="onClickNextPage"
                    :disabled="isInLastPage"
                  >
                    <span aria-hidden="true">&#8250;</span>
                  </button>
                </li>

                <li class="page-item">
                  <button
                    class="page-link"
                    type="button"
                    aria-label="Next"
                    @click="onClickLastPage"
                    :disabled="isInLastPage"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <router-link
      to="/add-certificate"
      class="btn btn-add rounded-circle shadow"
      v-if="access"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
      </span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { dateFormat } from "../../utils/dateFormat";
import { shortingTableItems } from "../../utils/shortingTableItems";
import { arrayFormat } from "../../utils/arrayFormat";
import type { ICertificate } from "@/types/ICertificate";

const props = defineProps<{
  certificates: ICertificate[];
  perPage: number;
}>();

const store = useStore();
const router = useRouter();
const userRole = computed(() => store.getters["auth/user"].roles);
const access = ref<boolean>(false);

//максимальное количество нуерных кнопок страниц
const maxVisibleButtons = ref<number>(5);
//количество на странице
const perPage = ref<number>(props.perPage);
//текущая страница
const currentPage = ref<number>(1);
//всего страниц
const totalPages = ref<number>(
  Math.ceil(props.certificates.length / props.perPage)
);

//проверка адресной строки браузера
onMounted(() => {
  if (userRole) {
    userRole.value.includes("admin") || userRole.value.includes("god")
      ? (access.value = true)
      : (access.value = false);
  }

  const href: string = router.currentRoute.value.fullPath;
  const pageNum = Number(href.substring(12));

  if (
    href.substring(0, 12) === "/index?page=" &&
    !isNaN(pageNum) &&
    pageNum > 0 &&
    pageNum <= totalPages.value
  ) {
    currentPage.value = pageNum;
  } else if (pageNum === 0) {
    currentPage.value = 1;
    router.push("/");
  } else if (pageNum < 0) {
    currentPage.value = 1;
    router.push("/");
  } else if (pageNum > totalPages.value) {
    currentPage.value = totalPages.value;
    router.push(`/index?page=${currentPage.value}`);
  } else {
    router.push("/");
  }
});

const paginatedData = computed(() => {
  let start = (currentPage.value - 1) * perPage.value,
    end = start + perPage.value;

  return props.certificates.slice(start, end);
});

const startPage = computed(() => {
  if (currentPage.value === 1) return 1;
  if (currentPage.value === totalPages.value)
    return (
      totalPages.value - maxVisibleButtons.value + (maxVisibleButtons.value - 1)
    );
  return currentPage.value - 1;
});

const endPage = computed(() => {
  return Math.min(
    startPage.value + maxVisibleButtons.value - 1,
    totalPages.value
  );
});

const pages = computed(() => {
  let range = [];
  if (props.certificates.length && endPage.value) {
    for (let i = startPage.value; i <= endPage.value; i++) {
      range.push({
        number: i,
        isDisabled: i === currentPage.value,
      });
    }
  }
  return range;
});

const isInFirstPage = computed(() => {
  return currentPage.value === 1;
});

const isInLastPage = computed(() => {
  return currentPage.value === totalPages.value;
});

const onClickFirstPage = () => {
  currentPage.value = 1;
  router.push("/index?page=1");
};
const onClickPreviousPage = () => {
  currentPage.value = currentPage.value - 1;
  router.push(`/index?page=${currentPage.value}`);
};
const onClickPage = (page: number) => {
  currentPage.value = page;

  // /home?page=1
  router.push(`/index?page=${page}`);
};
const onClickNextPage = () => {
  currentPage.value = currentPage.value + 1;
  router.push(`/index?page=${currentPage.value}`);
};
const onClickLastPage = () => {
  currentPage.value = totalPages.value;
  router.push(`/index?page=${currentPage.value}`);
};
const isPageActive = (page: number) => {
  return currentPage.value === page;
};

//правильность отображения списка при фильтрации, если показана текущая страница != 1
//обновление общего числа страниц
watch(
  () => props.certificates,
  (certificatesList) => {
    //обновление общего числа страниц
    totalPages.value = Math.ceil(props.certificates.length / props.perPage);

    if (certificatesList.length < props.perPage + 1 && currentPage.value > 1) {
      currentPage.value = 1;
      router.push("/index?page=1");
    }

    if (currentPage.value > certificatesList.length / props.perPage + 1) {
      currentPage.value = 1;
      router.push("/index?page=1");
    }
  }
);

watch(
  () => router.currentRoute.value.fullPath,
  (newVal) => {
    //если пользователь находится на странице > 1 и переходит из меню на главную
    if (newVal == "/") {
      //сбрасываем пагинацию на начало
      currentPage.value = 1;
    }
  }
);
</script>

<style></style>
