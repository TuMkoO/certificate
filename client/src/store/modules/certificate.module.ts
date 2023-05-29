import axios from "../../axios/request";
import $api from "../../axios/request";
import { ActionContext } from "vuex";
import type { ICertificate } from "@/types/ICertificate";
import type { ICertificateUpdatePayload } from "@/types/ICertificateUpdatePayload";

interface State {
  certificates: ICertificate[];
}

export default {
  namespaced: true,
  state(): State {
    return {
      certificates: [],
    };
  },
  mutations: {
    //обновление в хранилище []
    setCertificates(state: State, certificates: ICertificate[]) {
      state.certificates = certificates;
    },
    //добавление новых значений в хранилище []
    addCertificate(state: State, certificate: ICertificate) {
      state.certificates.push(certificate);
    },
  },
  actions: {
    async create(
      { dispatch }: ActionContext<State, any>,
      payload: ICertificate
    ): Promise<void> {
      try {
        await $api.post("api/certificate/create", payload);

        dispatch(
          "setMessage",
          {
            value: "Новый протокол успешно добавлен",
            type: "primary",
          },
          { root: true }
        );
      } catch (e: any) {
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
    async load({ commit, dispatch }: ActionContext<State, any>): Promise<void> {
      try {
        const { data } = await $api.get<ICertificate[]>("api/certificate");

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

    async loadById(
      { dispatch }: ActionContext<State, any>,
      id: string
    ): Promise<ICertificate> {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        //загрузка с БД сервера
        const { data } = await axios.get<ICertificate>(
          `/api/certificate/${id}`,
          {
            headers: headers,
          }
        );

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

    async update(
      { dispatch }: ActionContext<State, any>,
      payload: ICertificateUpdatePayload
    ): Promise<void> {
      try {
        const id = payload.id;

        const dataload = payload.values;

        if (id) {
          await $api.put(`api/certificate/${id}`, dataload);

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
      } catch (e: any) {
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

    async remove(
      { dispatch }: ActionContext<State, any>,
      id: string
    ): Promise<void> {
      try {
        await $api.delete(`api/certificate/${id}`);

        dispatch(
          "setMessage",
          {
            value: "Протокол успешно удален",
            type: "primary",
          },
          { root: true }
        );
      } catch (e: any) {
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
    certificates(state: State) {
      return state.certificates;
    },
  },
};
