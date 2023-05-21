<template>
  <div class="mb-4 mt-minus-3">
    <div class="mb-2">
      <button
        class="btn btn-secondary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Фильтр
      </button>
    </div>
    <div class="collapse" id="collapseExample">
      <div class="card card-body bg-light">
        <div class="filters">
          <form class="row">
            <div class="col-xl-3 col-md-6">
              <div class="form-floating mb-3 mb-md-3 mb-lg-3 mb-xl-3 mb-sm-3">
                <input
                  type="text"
                  class="form-control"
                  id="fFirstname"
                  placeholder="Фамилия"
                  v-model="firstname"
                />
                <label for="fFirstname">Фамилия</label>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="form-floating mb-3 mb-md-3 mb-lg-3 mb-xl-3 mb-sm-3">
                <input
                  type="text"
                  class="form-control"
                  id="fSecondname"
                  placeholder="Имя"
                  v-model="secondname"
                />
                <label for="fSecondname">Имя</label>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="form-floating mb-3 mb-lg-3 mb-xl-3 mb-sm-3 mb-md-3">
                <input
                  type="text"
                  class="form-control"
                  id="fCertNum"
                  placeholder="Номер удостоверения"
                  v-model="numCertificate"
                />
                <label for="fCertNum">Номер удостоверения</label>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="form-floating mb-3 mb-lg-0 mb-xl-3 mb-sm-3 mb-md-0">
                <input
                  type="text"
                  class="form-control"
                  id="fCertStigma"
                  placeholder="Номер удостоверения"
                  v-model="stigmaGeneral"
                />
                <label for="fCertStigma">Клеймо</label>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="form-floating mb-3 mb-lg-0 mb-xl-0 mb-sm-0 mb-md-0">
                <input
                  type="date"
                  class="form-control"
                  id="expiration"
                  placeholder="Срок аттестации"
                  v-model="expiration"
                />
                <label for="expiration">Срок аттестации</label>
              </div>
            </div>
            <div class="col-12" v-if="showClearBtn">
              <button
                @click="resetFilter"
                type="button"
                class="btn btn-secondary mt-3"
              >
                Очистить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <div class="col-sm-4 col-md-3">
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm"
          v-model="sortType"
        >
          <option value="0" disabled>Сортировать</option>
          <option value="1">По номеру удостоверения ↑</option>
          <option value="2">По номеру удостоверения ↓</option>
          <option value="3">По ФИО ↑</option>
          <option value="4">По ФИО ↓</option>
          <option value="5">По дате окончания действия ↑</option>
          <option value="6">По дате окончания действия ↓</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  emits: ["update:modelValue"],
  props: ["modelValue"],
  setup(_, { emit }) {
    const firstname = ref();
    const secondname = ref();
    const numCertificate = ref();
    const stigmaGeneral = ref();
    const expiration = ref();
    const sortType = ref(0);

    watch(
      [
        firstname,
        secondname,
        numCertificate,
        stigmaGeneral,
        expiration,
        sortType,
      ],
      (values) => {
        emit("update:modelValue", {
          firstname: values[0],
          secondname: values[1],
          numCertificate: values[2],
          stigmaGeneral: values[3],
          expiration: values[4],
          sortType: values[5],
        });
      }
    );

    const showClearBtn = computed(
      () =>
        firstname.value ||
        secondname.value ||
        numCertificate.value ||
        stigmaGeneral.value ||
        expiration.value
    );

    return {
      firstname,
      secondname,
      expiration,
      numCertificate,
      stigmaGeneral,
      showClearBtn,
      sortType,
      resetFilter: () => {
        firstname.value = "";
        secondname.value = "";
        numCertificate.value = "";
        stigmaGeneral.value = "";
        expiration.value = "";
      },
    };
  },
};
</script>

<style></style>
