<template>
  <app-page title="Настройки">
    <div class="container">
      <div class="py-4">
        <h4 class="text-center mb-4">Настройки</h4>
      </div>
      <app-loader v-if="loading"></app-loader>
      <div v-else class="settings">
        <div class="row">
          <ul class="nav nav-tabs" id="settingsTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="settings-certificate-tab"
                data-bs-toggle="tab"
                data-bs-target="#settings-certificate"
                type="button"
                role="tab"
                aria-controls="settings-certificate"
                aria-selected="false"
              >
                <span class="nav-link__text">Удостоверение</span>
                <span class="nav-link__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-file-earmark-text"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
                    />
                    <path
                      d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
                    />
                  </svg>
                </span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link "
                id="settings-system-tab"
                data-bs-toggle="tab"
                data-bs-target="#settings-system"
                type="button"
                role="tab"
                aria-controls="settings-system"
                aria-selected="true"
              >
                <span class="nav-link__text">Системные</span>
                <span class="nav-link__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-gear"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                    />
                    <path
                      d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                    />
                  </svg>
                </span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link "
                id="settings-qr-tab"
                data-bs-toggle="tab"
                data-bs-target="#settings-qr"
                type="button"
                role="tab"
                aria-controls="settings-qr"
                aria-selected="true"
              >
                <span class="nav-link__text">Qr код</span>
                <span class="nav-link__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-qr-code"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2h2v2H2V2Z" />
                    <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z" />
                    <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z" />
                    <path
                      d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"
                    />
                    <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z" />
                  </svg>
                </span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link "
                id="settings-users-tab"
                data-bs-toggle="tab"
                data-bs-target="#settings-users"
                type="button"
                role="tab"
                aria-controls="settings-users"
                aria-selected="true"
              >
                <span class="nav-link__text">Пользователи</span>
                <span class="nav-link__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                    />
                  </svg>
                </span>
              </button>
            </li>
          </ul>
          <div class="tab-content" id="settingsContent">
            <div
              class="tab-pane fade show active"
              id="settings-certificate"
              role="tabpanel"
              aria-labelledby="settings-certificate-tab"
            >
              <h5 class="tab-pane-title my-4">
                Настройка выпадающих полей
              </h5>
              <div class="mt-3">
                <settings-certificate-fields></settings-certificate-fields>
              </div>
            </div>
            <div
              class="tab-pane fade "
              id="settings-system"
              role="tabpanel"
              aria-labelledby="settings-system-tab"
            >
              <h5 class="tab-pane-title my-4">Системные настройки</h5>
              <div v-if="systemSettings" class="mt-3">
                <settings-system :system="systemSettings"></settings-system>
              </div>
            </div>
            <div
              class="tab-pane fade "
              id="settings-qr"
              role="tabpanel"
              aria-labelledby="settings-qr-tab"
            >
              <h5 class="tab-pane-title my-4">Настройки QR кода</h5>
              <div class="mt-3">
                <settings-qr></settings-qr>
              </div>
            </div>
            <div
              class="tab-pane fade "
              id="settings-users"
              role="tabpanel"
              aria-labelledby="settings-users-tab"
            >
              <h5 class="tab-pane-title my-4">Управление пользователями</h5>
              <div class="mt-3">
                <settings-users></settings-users>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage";
import AppLoader from "../components/ui/AppLoader.vue";
import SettingsCertificateFields from "../components/settings/SettingsCertificateFields.vue";
import SettingsSystem from "../components/settings/SettingsSystem.vue";
import SettingsQr from "../components/settings/SettingsQr.vue";
import SettingsUsers from "../components/settings/SettingsUsers.vue";

export default {
  setup() {
    //store
    const store = useStore();
    //loader
    const loading = ref(false);

    onBeforeMount(async () => {
      loading.value = true;

      const linkAccess = "certificate-access";
      const linkAccessItem = "certificate-access-item";
      const linkQualifyingRank = "certificate-qualifying-rank";
      const linkAttestationType = "certificate-attestation-type";
      const linkWeldingMethod = "certificate-welding-method";
      const linkWeldedType = "certificate-welded-type";
      const linkWeldedSeam = "certificate-welded-seam";
      const linkWeldedConnection = "certificate-welded-connection";
      const linkWeldedPosition = "certificate-welded-position";
      const linkAxesPosition = "certificate-axes-position";
      const linkWeldedJoint = "certificate-welded-joint";
      const linkBrand = "certificate-brand";
      const linkElectrode = "certificate-electrode";
      const linkComission = "certificate-comission";
      const linkControl = "certificate-control";
      const linkGrade = "certificate-grade";
      const linkTextHead = "certificate-text-head";

      //выполнение в store экшена load
      await store.dispatch("certItem/load", linkAccess);
      await store.dispatch("certItem/load", linkAccessItem);
      await store.dispatch("certItem/load", linkQualifyingRank);
      await store.dispatch("certItem/load", linkAttestationType);
      await store.dispatch("certItem/load", linkWeldingMethod);
      await store.dispatch("certItem/load", linkWeldedType);
      await store.dispatch("certItem/load", linkWeldedSeam);
      await store.dispatch("certItem/load", linkWeldedConnection);
      await store.dispatch("certItem/load", linkWeldedPosition);
      await store.dispatch("certItem/load", linkAxesPosition);
      await store.dispatch("certItem/load", linkWeldedJoint);
      await store.dispatch("certItem/load", linkBrand);
      await store.dispatch("certItem/load", linkElectrode);
      await store.dispatch("certItem/load", linkComission);
      await store.dispatch("certItem/load", linkControl);
      await store.dispatch("certItem/load", linkGrade);
      await store.dispatch(`certItem/load`, linkTextHead);

      await store.dispatch("qr/load");
      await store.dispatch("auth/loadUsers");

      loading.value = false;
    });

    const systemSettings = computed(() => store.getters["system/systems"]);

    return {
      loading,
      systemSettings,
    };
  },
  components: {
    AppPage,
    AppLoader,
    SettingsCertificateFields,
    SettingsSystem,
    SettingsQr,
    SettingsUsers,
  },
};
</script>

<style></style>
