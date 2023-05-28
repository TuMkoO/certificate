<template>
  <div class="accordion" id="accordionCertificateSettings">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTextHead">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTextHead"
          aria-expanded="true"
          aria-controls="collapseTextHead"
        >
          Текст в шапке Протокола
        </button>
      </h2>
      <div
        id="collapseTextHead"
        class="accordion-collapse collapse show"
        aria-labelledby="headingTextHead"
        data-bs-parent="#accordionCertificateSettings"
      >
        <div class="accordion-body">
          <div class="form-floating">
            <textarea
              placeholder="Текст шапки"
              id="textHead"
              style="height: 150px"
              :class="['form-control', { 'is-invalid': tHeadError }]"
              v-model="textHead"
            ></textarea>
            <label for="textHead">Текст шапки</label>
          </div>
          <div class="form-text text-danger" v-if="tHeadError">
            {{ tHeadError }}
          </div>
          <button
            type="button"
            class="btn btn-outline-secondary mt-2"
            @click="onSubmitTextHead"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>

    <SettingsCertificateFieldsItem
      :itemsList="qualifyingRanks"
      placeholder="Квалификационный разряд"
      storeName="certQualifyingRanks"
      storeLink="certificate-qualifying-rank"
      errorText="Введите квалификационный разряд"
      headingId="headingQualifyingRanks"
      collapseId="collapseQualifyingRanks"
    />
    <SettingsCertificateFieldsItem
      :itemsList="attestationTypes"
      placeholder="Вид аттестации"
      storeName="certAttestationTypes"
      storeLink="certificate-attestation-type"
      errorText="Введите вид аттестации"
      headingId="headingAttestationType"
      collapseId="collapseAttestationType"
    />
    <SettingsCertificateFieldsItem
      :itemsList="brands"
      placeholder="Марка и группа"
      storeName="certBrands"
      storeLink="certificate-brand"
      errorText="Введите марку и группу"
      headingId="headingBrand"
      collapseId="collapseBrand"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldingMethods"
      placeholder="Способ сварки"
      storeName="certWeldingMethods"
      storeLink="certificate-welding-method"
      errorText="Введите cпособ сварки"
      headingId="headingWeldingMethod"
      collapseId="collapseWeldingMethod"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedTypes"
      placeholder="Вид свариваемых деталей"
      storeName="certWeldedTypes"
      storeLink="certificate-welded-type"
      errorText="Введите вид свариваемых деталей"
      headingId="headingWeldedType"
      collapseId="collapseWeldedType"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedSeams"
      placeholder="Тип сварного шва"
      storeName="certWeldedSeams"
      storeLink="certificate-welded-seam"
      errorText="Введите тип сварного шва"
      headingId="headingWeldedSeam"
      collapseId="collapseWeldedSeam"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedConnections"
      placeholder="Тип и вид соединения"
      storeName="certWeldedConnections"
      storeLink="certificate-welded-connection"
      errorText="Введите тип и вид соединения"
      headingId="headingWeldedConnection"
      collapseId="collapseWeldedConnection"
    />

    <SettingsCertificateFieldsItem
      :itemsList="weldedPositions"
      placeholder="Положение при сварке"
      storeName="certWeldedPositions"
      storeLink="certificate-welded-position"
      errorText="Введите положение при сварке"
      headingId="headingWeldedPosition"
      collapseId="collapseWeldedPosition"
    />
    <SettingsCertificateFieldsItem
      :itemsList="axesPositions"
      placeholder="Положение осей стержней"
      storeName="certAxesPositions"
      storeLink="certificate-axes-position"
      errorText="Введите положение осей стержней"
      headingId="headingAxesPosition"
      collapseId="collapseAxesPosition"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedJoints"
      placeholder="Тип сварного соединения"
      storeName="certWeldedJoints"
      storeLink="certificate-welded-joint"
      errorText="Введите тип сварного соединения"
      headingId="headingWeldedJoint"
      collapseId="collapseWeldedJoint"
    />

    <SettingsCertificateFieldsItem
      :itemsList="electrodes"
      placeholder="Электрод или присадочная проволока"
      storeName="certElectrodes"
      storeLink="certificate-electrode"
      errorText="Введите электрод или присадочную проволоку"
      headingId="headingElectrode"
      collapseId="collapseElectrode"
    />

    <SettingsCertificateFieldsItem
      :itemsList="grades"
      placeholder="Оценка"
      storeName="certGrades"
      storeLink="certificate-grade"
      errorText="Введите оценку"
      headingId="headingGrade"
      collapseId="collapseGrade"
    />
    <SettingsCertificateFieldsItem
      :itemsList="controls"
      placeholder="Контроль качества образца"
      storeName="certControls"
      storeLink="certificate-control"
      errorText="Введите вид контроля качества образца"
      headingId="headingControl"
      collapseId="collapseControl"
    />

    <SettingsCertificateFieldsItem
      :itemsList="accesses"
      placeholder="Группы технических устройств опасных производственных объектов"
      storeName="certAccesses"
      storeLink="certificate-access"
      errorText="Введите группу технических устройств опасных производственных объектов"
      headingId="headingAccess"
      collapseId="collapseAccess"
      withItems
    />

    <SettingsCertificateFieldsItem
      :itemsList="comissions"
      placeholder="Аттестационная комиссия"
      storeName="certComissions"
      storeLink="certificate-comission"
      errorText="Введите членов аттестационной комиссии"
      headingId="headingComission"
      collapseId="collapseComission"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import SettingsCertificateFieldsItem from "./SettingsCertificateFieldsItem.vue";

//подключаем store
const store = useStore();

const textHeadValue = computed(() => store.getters["certItem/certTextHeads"]);
const qualifyingRanks = computed(
  () => store.getters["certItem/certQualifyingRanks"]
);
const attestationTypes = computed(
  () => store.getters["certItem/certAttestationTypes"]
);
const weldingMethods = computed(
  () => store.getters["certItem/certWeldingMethods"]
);
const weldedTypes = computed(() => store.getters["certItem/certWeldedTypes"]);
const weldedSeams = computed(() => store.getters["certItem/certWeldedSeams"]);
const weldedConnections = computed(
  () => store.getters["certItem/certWeldedConnections"]
);
const weldedPositions = computed(
  () => store.getters["certItem/certWeldedPositions"]
);
const axesPositions = computed(
  () => store.getters["certItem/certAxesPositions"]
);
const weldedJoints = computed(() => store.getters["certItem/certWeldedJoints"]);
const brands = computed(() => store.getters["certItem/certBrands"]);
const electrodes = computed(() => store.getters["certItem/certElectrodes"]);
const comissions = computed(() => store.getters["certItem/certComissions"]);
const controls = computed(() => store.getters["certItem/certControls"]);
const grades = computed(() => store.getters["certItem/certGrades"]);
const accesses = computed(() => store.getters["certItem/certAccesses"]);

const { handleSubmit } = useForm();

const { value: textHead, errorMessage: tHeadError } = useField(
  "textHead",
  yup.string().trim().required("Введите текст шапки Протокола")
);

onMounted(async () => {
  textHead.value = textHeadValue.value[0].value;
});

//сохранить введенное значение
const onSubmitTextHead = handleSubmit(async (values) => {
  const link = "certificate-text-head";
  const id = textHeadValue.value[0]._id;
  const newValues = { value: values.textHead };

  // вызываем метод update для обновления записи в БД
  await store.dispatch(`certItem/update`, { newValues, link, id });
});
</script>

<style></style>
