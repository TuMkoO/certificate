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

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import CertificatesFilter from "../components/certificates/CertificatesFilter.vue";
import CertificatesTable from "../components/certificates/CertificatesTable.vue";

export default {
  setup() {
    //store
    const store = useStore();
    //loader
    const loading = ref(false);
    //
    const filter = ref({});
    //список удостоверений
    const storeData = [];

    //загрузка списка удостоверений
    onMounted(async () => {
      loading.value = true;
      await store.dispatch("certificate/load");
      await store.dispatch("certificateSub/load");

      store.getters["certificate/certificates"].forEach((item) => {
        storeData.push(item);
      });
      store.getters["certificateSub/certificatesSub"].forEach((item) => {
        storeData.push(item);
      });

      //сортировка по умолчанию - новые сверху
      storeData.sort((a, b) => {
        if (a.numCertificate > b.numCertificate) return -1;
        if (a.numCertificate == b.numCertificate) return 0;
        if (a.numCertificate < b.numCertificate) return 1;
      });

      // console.log("storeData::", storeData);

      loading.value = false;
    });

    const certificates = computed(() =>
      storeData
        .sort(sorting)
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
            return cert.expiration.includes(filter.value.expiration);
          }

          return true;
        })
    );

    function sorting(a, b) {
      // console.log(a, b);
      // console.log(filter.value.sortType);

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
    }

    return {
      certificates,
      loading,
      filter,
      storeData,
    };
  },
  components: { AppPage, AppLoader, CertificatesFilter, CertificatesTable },
};
</script>
