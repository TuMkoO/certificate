<template>
  <app-page title="Добавить новое удостоверение">
    <div class="container-md">
      <div class="py-4">
        <h4 v-if="$route.params.numCertificate" class="text-center mb-5">
          Добавить новый вкладыш
        </h4>
        <h4 v-else class="text-center mb-5">Добавить новое удостоверение</h4>
      </div>
      <div>
        <new-certificate-form
          :certValues="subCertificateparams"
          :certSubmit="'create'"
        ></new-certificate-form>
      </div>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/ui/AppPage.vue";
import NewCertificateForm from "../components/certificates/NewCertificateForm.vue";

const subCertificateparams = window.history.state.params;
</script>

<style scoped></style>
