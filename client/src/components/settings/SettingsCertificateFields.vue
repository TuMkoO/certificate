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
          <div class="form-floating ">
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
      :itemsList="qualifyingRankItems"
      placeholder="Квалификационный разряд"
      storeName="certQualifyingRanks"
      storeLink="certificate-qualifying-rank"
      errorText="Введите квалификационный разряд"
      headingId="headingQualifyingRanks"
      collapseId="collapseQualifyingRanks"
    />
    <SettingsCertificateFieldsItem
      :itemsList="attestationTypeItems"
      placeholder="Вид аттестации"
      storeName="certAttestationTypes"
      storeLink="certificate-attestation-type"
      errorText="Введите вид аттестации"
      headingId="headingAttestationType"
      collapseId="collapseAttestationType"
    />
    <SettingsCertificateFieldsItem
      :itemsList="brandItems"
      placeholder="Марка и группа"
      storeName="certBrands"
      storeLink="certificate-brand"
      errorText="Введите марку и группу"
      headingId="headingBrand"
      collapseId="collapseBrand"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldingMethodItems"
      placeholder="Способ сварки"
      storeName="certWeldingMethods"
      storeLink="certificate-welding-method"
      errorText="Введите cпособ сварки"
      headingId="headingWeldingMethod"
      collapseId="collapseWeldingMethod"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedTypeItems"
      placeholder="Вид свариваемых деталей"
      storeName="certWeldedTypes"
      storeLink="certificate-welded-type"
      errorText="Введите вид свариваемых деталей"
      headingId="headingWeldedType"
      collapseId="collapseWeldedType"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedSeamItems"
      placeholder="Тип сварного шва"
      storeName="certWeldedSeams"
      storeLink="certificate-welded-seam"
      errorText="Введите тип сварного шва"
      headingId="headingWeldedSeam"
      collapseId="collapseWeldedSeam"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedConnectionItems"
      placeholder="Тип и вид соединения"
      storeName="certWeldedConnections"
      storeLink="certificate-welded-connection"
      errorText="Введите тип и вид соединения"
      headingId="headingWeldedConnection"
      collapseId="collapseWeldedConnection"
    />

    <SettingsCertificateFieldsItem
      :itemsList="weldedPositionItems"
      placeholder="Положение при сварке"
      storeName="certWeldedPositions"
      storeLink="certificate-welded-position"
      errorText="Введите положение при сварке"
      headingId="headingWeldedPosition"
      collapseId="collapseWeldedPosition"
    />
    <SettingsCertificateFieldsItem
      :itemsList="axesPositionItems"
      placeholder="Положение осей стержней"
      storeName="certAxesPositions"
      storeLink="certificate-axes-position"
      errorText="Введите положение осей стержней"
      headingId="headingAxesPosition"
      collapseId="collapseAxesPosition"
    />
    <SettingsCertificateFieldsItem
      :itemsList="weldedJointItems"
      placeholder="Тип сварного соединения"
      storeName="certWeldedJoints"
      storeLink="certificate-welded-joint"
      errorText="Введите тип сварного соединения"
      headingId="headingWeldedJoint"
      collapseId="collapseWeldedJoint"
    />

    <SettingsCertificateFieldsItem
      :itemsList="electrodeItems"
      placeholder="Электрод или присадочная проволока"
      storeName="certElectrodes"
      storeLink="certificate-electrode"
      errorText="Введите электрод или присадочную проволоку"
      headingId="headingElectrode"
      collapseId="collapseElectrode"
    />

    <SettingsCertificateFieldsItem
      :itemsList="gradeItems"
      placeholder="Оценка"
      storeName="certGrades"
      storeLink="certificate-grade"
      errorText="Введите оценку"
      headingId="headingGrade"
      collapseId="collapseGrade"
    />
    <SettingsCertificateFieldsItem
      :itemsList="controlItems"
      placeholder="Контроль качества образца"
      storeName="certControls"
      storeLink="certificate-control"
      errorText="Введите вид контроля качества образца"
      headingId="headingControl"
      collapseId="collapseControl"
    />

    <SettingsCertificateFieldsItem
      :itemsList="accessItems"
      placeholder="Группы технических устройств опасных производственных объектов"
      storeName="certAccesses"
      storeLink="certificate-access"
      errorText="Введите группу технических устройств опасных производственных объектов"
      headingId="headingAccess"
      collapseId="collapseAccess"
      withItems
    />

    <SettingsCertificateFieldsItem
      :itemsList="comissionItems"
      placeholder="Аттестационная комиссия"
      storeName="certComissions"
      storeLink="certificate-comission"
      errorText="Введите членов аттестационной комиссии"
      headingId="headingComission"
      collapseId="collapseComission"
    />
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import SettingsCertificateFieldsItem from "./SettingsCertificateFieldsItem.vue";
import AppLoader from "../ui/AppLoader.vue";

export default {
  setup() {
    //подключаем store
    const store = useStore();
    //значение input Текста шапки
    const textHeadValue = ref({});
    //значения полей мультиселекта
    const qualifyingRankItems = [];
    const attestationTypeItems = [];
    const weldingMethodItems = [];
    const weldedTypeItems = [];
    const weldedSeamItems = [];
    const weldedConnectionItems = [];
    const weldedPositionItems = [];
    const axesPositionItems = [];
    const weldedJointItems = [];
    const brandItems = [];
    const electrodeItems = [];
    const comissionItems = [];
    const controlItems = [];
    const gradeItems = [];
    const accessItems = [];
    // const accessSubItems = [];

    const { isSubmitting, handleSubmit } = useForm();

    const {
      value: textHead,
      errorMessage: tHeadError,
      handleBlur: tHeadBlur,
      handleChange: tHeadChange,
    } = useField(
      "textHead",
      yup
        .string()
        .trim()
        .required("Введите текст шапки Протокола")
    );

    //загрузка значений:
    onMounted(async () => {
      //получаем значение input
      textHeadValue.value = computed(
        () => store.getters["certItem/certTextHeads"]
      );
      //добавляем значения в input
      textHead.value = textHeadValue.value.value[0].value;

      const qualifyingRanks = computed(
        () => store.getters["certItem/certQualifyingRanks"]
      );
      qualifyingRanks.value.forEach((item) => {
        qualifyingRankItems.push(item);
      });
      const attestationTypes = computed(
        () => store.getters["certItem/certAttestationTypes"]
      );
      attestationTypes.value.forEach((item) => {
        attestationTypeItems.push(item);
      });
      const weldingMethods = computed(
        () => store.getters["certItem/certWeldingMethods"]
      );
      weldingMethods.value.forEach((item) => {
        weldingMethodItems.push(item);
      });
      const weldedTypes = computed(
        () => store.getters["certItem/certWeldedTypes"]
      );
      weldedTypes.value.forEach((item) => {
        weldedTypeItems.push(item);
      });
      const weldedSeams = computed(
        () => store.getters["certItem/certWeldedSeams"]
      );
      weldedSeams.value.forEach((item) => {
        weldedSeamItems.push(item);
      });
      const weldedConnections = computed(
        () => store.getters["certItem/certWeldedConnections"]
      );
      weldedConnections.value.forEach((item) => {
        weldedConnectionItems.push(item);
      });

      const weldedPositions = computed(
        () => store.getters["certItem/certWeldedPositions"]
      );
      weldedPositions.value.forEach((item) => {
        weldedPositionItems.push(item);
      });
      const axesPositions = computed(
        () => store.getters["certItem/certAxesPositions"]
      );
      axesPositions.value.forEach((item) => {
        axesPositionItems.push(item);
      });
      const weldedJoints = computed(
        () => store.getters["certItem/certWeldedJoints"]
      );
      weldedJoints.value.forEach((item) => {
        weldedJointItems.push(item);
      });

      const brands = computed(() => store.getters["certItem/certBrands"]);
      brands.value.forEach((item) => {
        brandItems.push(item);
      });

      const electrodes = computed(
        () => store.getters["certItem/certElectrodes"]
      );
      electrodes.value.forEach((item) => {
        electrodeItems.push(item);
      });

      const comissions = computed(
        () => store.getters["certItem/certComissions"]
      );
      comissions.value.forEach((item) => {
        comissionItems.push(item);
      });

      const controls = computed(() => store.getters["certItem/certControls"]);
      controls.value.forEach((item) => {
        controlItems.push(item);
      });

      const grades = computed(() => store.getters["certItem/certGrades"]);
      grades.value.forEach((item) => {
        gradeItems.push(item);
      });

      const accesses = computed(() => store.getters["certItem/certAccesses"]);
      accesses.value.forEach((item) => {
        accessItems.push(item);
      });
      // const accessSubs = computed(() => store.getters["certItem/certAccessItems"]);
      // accessSubs.value.forEach((item) => {
      //   accessSubItems.push(item);
      // });
    });

    //сохранить введенное значение
    const submitTextHead = async (values) => {
      const link = "certificate-text-head";
      const id = textHeadValue.value.value[0]._id;
      const newValues = { value: values.textHead };

      // вызываем метод update для обновления записи в БД
      await store.dispatch(`certItem/update`, { newValues, link, id });
    };

    const onSubmitTextHead = handleSubmit(submitTextHead);

    return {
      qualifyingRankItems,
      attestationTypeItems,
      weldingMethodItems,
      weldedTypeItems,
      weldedSeamItems,
      weldedConnectionItems,
      weldedPositionItems,
      axesPositionItems,
      weldedJointItems,
      brandItems,
      electrodeItems,
      comissionItems,
      controlItems,
      gradeItems,

      accessItems,
      textHeadValue,
      textHead,
      tHeadError,
      tHeadBlur,
      tHeadChange,

      isSubmitting,
      onSubmitTextHead,
    };
  },
  components: {
    SettingsCertificateFieldsItem,
    AppLoader,
  },
};
</script>

<style></style>
