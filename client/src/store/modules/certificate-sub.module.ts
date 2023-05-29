import axios from "../../axios/request";
import $api from "../../axios/request";
import { ActionContext } from "vuex";
import type { ICertificate } from "@/types/ICertificate";
import type { ICertificateUpdatePayload } from "@/types/ICertificateUpdatePayload";

interface State {
  certificatesSub: ICertificate[];
}

export default {
  namespaced: true,
  state(): State {
    return {
      certificatesSub: [],
    };
  },
  mutations: {
    //обновление в хранилище []
    setCertificatesSub(state: State, certificatesSub: ICertificate[]) {
      state.certificatesSub = certificatesSub;
    },
    //добавление новых значений в хранилище []
    addCertificate(state: State, certificateSub: ICertificate) {
      state.certificatesSub.push(certificateSub);
    },
  },
  actions: {
    async create(
      { dispatch }: ActionContext<State, any>,
      payload: ICertificate
    ): Promise<void> {
      try {
        await $api.post("api/certificate-sub/create", payload);

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
        const { data } = await $api.get("api/certificate-sub");

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

    async loadOwner(
      { dispatch }: ActionContext<State, any>,
      certId: string
    ): Promise<ICertificate> {
      try {
        const { data } = await $api.get<ICertificate>("api/certificate-sub", {
          params: {
            certId: certId,
          },
        });

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
          `/api/certificate-sub/${id}`,
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
        //получаем id
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = payload.values;

        if (id) {
          await $api.put(`api/certificate-sub/${id}`, dataload);

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
        await $api.delete(`api/certificate-sub/${id}`);

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
    certificatesSub(state: State) {
      return state.certificatesSub;
    },
  },
};
