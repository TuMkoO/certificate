import $api from "../../axios/request";
// import store from "../index";

export default {
  namespaced: true,
  state() {
    return {
      // qrs: [],
      qrs: "",
    };
  },

  mutations: {
    //обновление в хранилище []
    setQrs(state, qrs) {
      state.qrs = qrs;
    },
    //добавление новых значений в хранилище []
    addQr(state, qr) {
      // state.qrs.push(qr);
      state.qrs = qr;
    },
  },

  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        //получаем токен из store
        // const token = store.getters["auth/token"];

        // const headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // };

        const { data } = await $api.post("api/qr-code/create", payload);

        dispatch(
          "setMessage",
          {
            value: "Данные для Qr код успешно добавлены",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },
    async load({ commit, dispatch }) {
      try {
        //получаем токен из store
        // const token = store.getters["auth/token"];

        // const headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // };

        //загрузка с БД сервера
        const { data } = await $api.get("/api/qr-code");

        // console.log("data", data);

        //вызываем mutation
        commit("setQrs", data);
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async loadById({ commit, dispatch }, id) {
      try {
        // const headers = {
        //   "Content-Type": "application/json",
        // };

        //загрузка с БД сервера
        const { data } = await $api.get(`/api/qr-code/${id}`);

        return data;
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async update({ dispatch }, payload) {
      try {
        //получаем токен из store
        // const token = store.getters["auth/token"];
        // id
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = payload.values;

        // console.log(payload);

        // const headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // };

        if (id) {
          // console.log("certificate id", id);
          const data = await $api.put(`api/qr-code/${id}`, dataload);

          dispatch(
            "setMessage",
            {
              value: "Настройки QR кода успешно изменены",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет настроек QR кода с таким id или другая ошибка",
              type: "danger",
            },
            { root: true }
          );
        }
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.message,
            type: "danger",
          },
          { root: true }
        );
      }
    },

    /*async remove({ commit, dispatch }, id) {
      try {
        //получаем токен из store
        const token = store.getters["auth/token"];

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const { data } = await axios.delete(`api/qr-code/${id}`, {
          headers: headers,
        });

        dispatch(
          "setMessage",
          {
            value: "Настройки QR кода успешно удален",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.message,
            type: "danger",
          },
          { root: true }
        );
      }
    },*/
  },
  getters: {
    qrs(state) {
      return state.qrs;
    },
  },
};
