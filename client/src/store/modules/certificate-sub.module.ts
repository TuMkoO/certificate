import axios from "../../axios/request";
import $api from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      certificatesSub: [],
    };
  },
  mutations: {
    //обновление в хранилище []
    setCertificatesSub(state, certificatesSub) {
      state.certificatesSub = certificatesSub;
    },
    //добавление новых значений в хранилище []
    addCertificate(state, certificateSub) {
      state.certificatesSub.push(certificateSub);
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const { data } = await $api.post("api/certificate-sub/create", payload);

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
        const { data } = await $api.get("api/certificate-sub");

        // console.log("certificate-sub.module/load data::: ", data);

        // сначала вывод новых записей, добавляем поле id
        // const certificatesSub = Object.keys(data.slice().reverse()).map(
        //   (id) => ({
        //     ...data.slice().reverse()[id],
        //     id,
        //   })
        // );

        //вызываем mutation
        // commit("setCertificatesSub", certificatesSub);
        commit("setCertificatesSub", data);
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

    async loadOwner({ commit, dispatch }, certId) {
      try {
        const { data } = await $api.get("api/certificate-sub", {
          params: {
            certId: certId,
          },
        });

        // console.log("certificate-sub.module/load data::: ", data);

        // сначала вывод новых записей, добавляем поле id
        // const certificatesSub = Object.keys(data.slice().reverse()).map(
        //   (id) => ({
        //     ...data.slice().reverse()[id],
        //     id,
        //   })
        // );

        // console.log(
        //   "certificate-sub.module/load certificatesSub::: ",
        //   certificatesSub
        // );

        //вызываем mutation
        // commit("setCertificatesSub", certificatesSub);
        // commit("setCertificatesSub", data);
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

    async loadById({ commit, dispatch }, id) {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        //загрузка с БД сервера
        const { data } = await axios.get(`/api/certificate-sub/${id}`, {
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
        //получаем id
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = payload.values;

        // console.log(payload);

        if (id) {
          // console.log("certificate id", id);
          const data = await $api.put(`api/certificate-sub/${id}`, dataload);

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
        const { data } = await $api.delete(`api/certificate-sub/${id}`);

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
    certificatesSub(state) {
      return state.certificatesSub;
    },
  },
};
