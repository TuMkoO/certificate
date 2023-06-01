import axios from "axios";
import $api from "../../axios/request";
import { ActionContext } from "vuex";
import type { SystemsSettings } from "@/types/SettingsSystem";

interface State {
  systems: SystemsSettings[];
}

interface SystemsUpdatePayload {
  id: string;
  values: SystemsSettings;
}

export default {
  namespaced: true,
  state(): State {
    return {
      systems: [] as SystemsSettings[],
    };
  },

  mutations: {
    //обновление в хранилище []
    setSystems(state: State, systems: SystemsSettings[]) {
      state.systems = systems;
    },
    //добавление новых значений в хранилище []
    addSystem(state: State, system: any) {
      state.systems.push(system);
    },
  },

  actions: {
    async load({ commit, dispatch }: ActionContext<State, any>): Promise<void> {
      try {
        process.env.NODE_ENV === "production"
          ? (axios.defaults.baseURL = import.meta.env.VITE_DB_URL_HOSTING)
          : (axios.defaults.baseURL = import.meta.env.VITE_DB_URL);

        const headers = {
          "Content-Type": "application/json",
        };

        //загрузка с БД сервера
        const { data } = await axios.get<SystemsSettings[]>("api/system/", {
          headers: headers,
        });

        //вызываем mutation
        commit("setSystems", data[0]);
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
      { commit, dispatch }: ActionContext<State, any>,
      payload: SystemsUpdatePayload
    ): Promise<void> {
      try {
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = payload.values;

        if (id) {
          const { data } = await $api.put(
            `api/system/${id}`,
            { ...dataload },
            { withCredentials: true }
          );

          commit("setSystems", data.systemData);

          dispatch(
            "setMessage",
            {
              value: "Системные настройки успешно изменены",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет системных настроек с таким id или другая ошибка",
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
    systems(state: State) {
      return state.systems;
    },
  },
};
