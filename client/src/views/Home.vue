<template>
  <app-page title="Реестр сварочного производства">
    <div class="container-fluid">
      <div class="py-4">
        <h4 class="text-center mb-4">Реестр сварочного производства</h4>
      </div>

      <app-loader v-if="loading"></app-loader>

      <certificates-filter
        v-if="!loading && storeData.length"
        v-model="filter"
      ></certificates-filter>

      <certificates-table
        v-if="!loading && storeData.length"
        :certificates="certificates"
        :per-page="10"
      ></certificates-table>

      <div
        class="d-flex flex-column align-items-center"
        v-if="!loading && !storeData.length"
      >
        <h5 class="text-center">В реестре нет записей</h5>
        <router-link to="/add-certificate">Добавить новую запись</router-link>
      </div>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import CertificatesFilter from "../components/certificates/CertificatesFilter.vue";
import CertificatesTable from "../components/certificates/CertificatesTable.vue";
import type { ICertificate } from "@/types/ICertificate";
import type { ICertificatesFilter } from "@/types/ICertificatesFilter";

//store
const store = useStore();
//loader
const loading = ref<boolean>(false);
//поля фильтра
const filter = ref<ICertificatesFilter>({} as ICertificatesFilter);
//список удостоверений
const storeData: ICertificate[] = [];

const certificates = computed(() =>
  storeData
    .sort((a: ICertificate, b: ICertificate): number => {
      switch (filter.value.sortType) {
        case "1":
          if (a.numCertificate > b.numCertificate) return 1;
          if (a.numCertificate == b.numCertificate) return 0;
          if (a.numCertificate < b.numCertificate) return -1;
          break;
        case "2":
          if (a.numCertificate > b.numCertificate) return -1;
          if (a.numCertificate == b.numCertificate) return 0;
          if (a.numCertificate < b.numCertificate) return 1;
          break;
        case "3":
          if (a.firstname > b.firstname) return 1;
          if (a.firstname == b.firstname) return 0;
          if (a.firstname < b.firstname) return -1;
          break;
        case "4":
          if (a.firstname > b.firstname) return -1;
          if (a.firstname == b.firstname) return 0;
          if (a.firstname < b.firstname) return 1;
          break;
        case "5":
          if (new Date(a.expiration) > new Date(b.expiration)) return 1;
          if (new Date(a.expiration) == new Date(b.expiration)) return 0;
          if (new Date(a.expiration) < new Date(b.expiration)) return -1;
          break;
        case "6":
          if (new Date(a.expiration) > new Date(b.expiration)) return -1;
          if (new Date(a.expiration) == new Date(b.expiration)) return 0;
          if (new Date(a.expiration) < new Date(b.expiration)) return 1;
          break;

        default:
          break;
      }
      return 0;
    })
    .filter((cert) => {
      if (filter.value.firstname) {
        return cert.firstname
          .toLowerCase()
          .includes(filter.value.firstname.toLowerCase());
      }

      return true;
    })
    .filter((cert) => {
      if (filter.value.secondname) {
        return cert.secondname
          .toLowerCase()
          .includes(filter.value.secondname.toLowerCase());
      }

      return true;
    })
    .filter((cert) => {
      if (filter.value.numCertificate) {
        return cert.numCertificate
          .toLowerCase()
          .includes(filter.value.numCertificate.toLowerCase());
      }

      return true;
    })
    .filter((cert) => {
      if (filter.value.stigmaGeneral) {
        return cert.stigmaGeneral
          .toLowerCase()
          .includes(filter.value.stigmaGeneral.toLowerCase());
      }

      return true;
    })
    .filter((cert) => {
      if (filter.value.expiration) {
        return cert.expiration
          .toString()
          .includes(filter.value.expiration.toString());
      }

      return true;
    })
);

//загрузка списка удостоверений
onMounted(async () => {
  loading.value = true;
  await store.dispatch("certificate/load");
  await store.dispatch("certificateSub/load");

  store.getters["certificate/certificates"].forEach((item: ICertificate) => {
    storeData.push(item);
  });
  store.getters["certificateSub/certificatesSub"].forEach(
    (item: ICertificate) => {
      storeData.push(item);
    }
  );

  //сортировка по умолчанию - новые сверху
  storeData.sort((a: ICertificate, b: ICertificate): number => {
    if (a.numCertificate > b.numCertificate) return -1;
    if (a.numCertificate < b.numCertificate) return 1;
    return 0;
  });

  loading.value = false;
});
</script>
