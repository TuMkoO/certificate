import { createStore, createLogger } from "vuex";
import auth from "./modules/auth.module";
import certItem from "./modules/cert-item.module";
import certificate from "./modules/certificate.module";
import certificateSub from "./modules/certificate-sub.module";
import system from "./modules/system.module";
import qr from "./modules/qr.module";

interface State {
  message: string | null;
}

const plugins = [];

if (import.meta.env.MODE === "development") {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state(): State {
    return {
      message: null,
    };
  },
  mutations: {
    setMessage(state: State, message: string) {
      state.message = message;
    },
    clearMessage(state: State) {
      state.message = null;
    },
  },
  actions: {
    setMessage({ commit }, message: string) {
      commit("setMessage", message);

      setTimeout(() => {
        commit("clearMessage");
      }, 5000);
    },
  },
  modules: {
    auth,
    certItem,
    certificate,
    certificateSub,
    system,
    qr,
  },
});
