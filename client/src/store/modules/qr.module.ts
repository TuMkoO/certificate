import $api from "../../axios/request";
import { ActionContext } from "vuex";

interface State {
  qrs: string;
}

interface UpdatePayload {
  id: string;
  values: { link: string };
}

export default {
  namespaced: true,
  state(): State {
    return {
      qrs: "",
    };
  },

  mutations: {
    //обновление в хранилище
    setQrs(state: State, qrs: string) {
      state.qrs = qrs;
    },
  },

  actions: {
    async create(
      { commit, dispatch }: ActionContext<State, any>,
      payload: string
    ): Promise<any> {
      try {
        await $api.post("api/qr-code/create", payload);

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
    async load({ commit, dispatch }: ActionContext<State, any>): Promise<void> {
      try {
        const { data } = await $api.get("/api/qr-code");

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

    async update(
      { dispatch }: ActionContext<State, any>,
      payload: UpdatePayload
    ): Promise<void> {
      try {
        const id = payload.id;
        const dataload = payload.values;

        if (id) {
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
    qrs(state: State) {
      return state.qrs;
    },
  },
};
