import axios from "../../axios/request";
import $api from "../../axios/request";
// import store from "../index";

export default {
  namespaced: true,
  state() {
    return {
      certificates: [],
    };
  },
  mutations: {
    //обновление в хранилище []
    setCertificates(state, certificates) {
      state.certificates = certificates;
    },
    //добавление новых значений в хранилище []
    addCertificate(state, certificate) {
      state.certificates.push(certificate);
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const { data } = await $api.post("api/certificate/create", payload);

        dispatch(
          "setMessage",
          {
            value: "Новый протокол успешно добавлен",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        if (e.message === "Request failed with status code 400") {
          dispatch(
            "setMessage",
            {
              value: "Удостоверение с таким номером уже добавлено",
              type: "danger",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: e,
              type: "danger",
            },
            { root: true }
          );
        }

        throw e;
      }
    },
    async load({ commit, dispatch }) {
      try {
        const { data } = await $api.get("api/certificate");

        // сначала вывод новых записей, добавляем поле id
        // const certificates = Object.keys(data.slice().reverse()).map((id) => ({
        //   ...data.slice().reverse()[id],
        //   id,
        // }));

        //вызываем mutation
        // commit("setCertificates", certificates);
        commit("setCertificates", data);
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
        const headers = {
          "Content-Type": "application/json",
        };

        //загрузка с БД сервера
        const { data } = await axios.get(`/api/certificate/${id}`, {
          headers: headers,
        });

        return data;
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: `Удостоверение с ID ${id} не найдено`,
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
          const data = await $api.put(`api/certificate/${id}`, dataload);

          dispatch(
            "setMessage",
            {
              value: "Удостоверение успешно изменено",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет удостоврения с таким id или другая ошибка",
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

    async remove({ commit, dispatch }, id) {
      try {
        //получаем токен из store
        // const token = store.getters["auth/token"];

        // const headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // };

        const { data } = await $api.delete(`api/certificate/${id}`);

        dispatch(
          "setMessage",
          {
            value: "Протокол успешно удален",
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
    },
  },
  getters: {
    certificates(state) {
      return state.certificates;
    },
  },
};
