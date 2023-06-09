import axios, { type AxiosPromise } from "axios";
import store from "../index";
import router from "../../router";
import $api from "../../axios/request";
import { ActionContext } from "vuex";
import type { IUser } from "@/types/IUser";
// import type { AxiosResponse } from "axios";
import type { AuthResponse } from "@/types/response/AuthResponse";

interface State {
  token: string | null;
  user: IUser;
  users: IUser[];
  isAuth: boolean;
}

interface Passwords {
  oldPassword: string;
  newPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

const TOKEN_KEY = "token";

export default {
  namespaced: true,
  state(): State {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      user: {} as IUser,
      users: [],
      isAuth: false,
    };
  },
  mutations: {
    // получение токена для login
    setToken(state: State, token: string) {
      state.token = token;
    },
    setUser(state: State, user: IUser) {
      state.user = user;
    },
    setUsers(state: State, users: IUser[]) {
      state.users = users;
    },
    // очистка токена при logout
    logout(state: State) {
      state.token = null;
      state.isAuth = false;
      state.user = {} as IUser;
      localStorage.removeItem(TOKEN_KEY);
    },
    setIsAuth(state: State) {
      state.isAuth = true;
    },
    clearIsAuth(state: State) {
      state.isAuth = false;
    },
  },
  actions: {
    async login(
      { commit, dispatch }: ActionContext<State, any>,
      payload: LoginData
    ): Promise<void> {
      try {
        const { data } = await $api.post<AuthResponse>(
          "api/auth/login",
          {
            ...payload,
          },
          { withCredentials: true }
        );

        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          commit("setToken", data.accessToken);
          commit("setIsAuth");
          commit("setUser", data.user);
          commit("clearMessage", null, {
            root: true,
          });
        }
      } catch (e: any) {
        let error = null;

        if (e.response?.status == 400) {
          error = "Введены неверные логин или пароль";
        }

        dispatch(
          "setMessage",
          {
            value: error || e.message,
            type: "danger",
          },
          {
            root: true,
          }
        );

        throw e;
      }
    },

    async logout({ commit }: ActionContext<State, any>): Promise<void> {
      //получаем токен из store
      const token = store.getters["auth/token"];

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        await $api.post(
          "api/auth/logout",
          {
            headers: headers,
          },
          { withCredentials: true }
        );

        commit("logout");
      } catch (error) {}
    },

    async register(
      { dispatch }: ActionContext<State, any>,
      payload: IUser
    ): Promise<void> {
      try {
        await $api.post(
          "api/auth/register",
          {
            ...payload,
          },
          { withCredentials: true }
        );

        dispatch(
          "setMessage",
          {
            value: "Новый пользователь успешно зарегистрирован",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value:
              "Ошибка при регистрации, возможно пользователь с таким email уже зарегистрирован",
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async loadUsers({
      commit,
      dispatch,
    }: ActionContext<State, any>): Promise<void> {
      try {
        const { data } = await $api.get<IUser[]>("api/auth/users", {
          withCredentials: true,
        });

        commit(
          "setUsers",
          data.filter((item: IUser) => !item.roles?.includes("god"))
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

    async loadCurrentUserId({ commit, dispatch }: ActionContext<State, any>) {
      try {
        const { data } = await $api.get("api/auth/user", {
          withCredentials: true,
        });

        if (data) {
          return data.user;
        } else {
          commit("logout");
        }
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

    async loadUserById(
      { dispatch }: ActionContext<State, any>,
      id: string
    ): Promise<IUser> {
      try {
        const { data } = await $api.get<IUser>(`api/auth/users/${id}`, {
          withCredentials: true,
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

    async update(
      { commit, dispatch }: ActionContext<State, any>,
      payload: IUser
    ): Promise<void> {
      try {
        const userId = store.getters["auth/user"].id;

        const dataload = {
          id: userId,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        };

        const { data } = await $api.post(
          "api/auth/update",
          {
            ...dataload,
          },
          { withCredentials: true }
        );

        if (data) {
          commit("setUser", data);
        }

        dispatch(
          "setMessage",
          {
            value: "Изменения в профиль успешно внесены",
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

    async updateById(
      { dispatch }: ActionContext<State, any>,
      payload: IUser
    ): Promise<void> {
      try {
        await $api.post(
          "api/auth/update",
          {
            ...payload,
          },
          { withCredentials: true }
        );

        dispatch(
          "setMessage",
          {
            value: `Изменения в профиль пользователя ${payload.name} успешно внесены`,
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

    async updatePassword(
      { dispatch }: ActionContext<State, any>,
      payload: Passwords
    ): Promise<void> {
      try {
        const userId = store.getters["auth/user"].id;

        const dataload = {
          id: userId,
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
        };

        const { data } = await $api.post(
          "api/auth/update-password",
          {
            ...dataload,
          },
          { withCredentials: true }
        );

        dispatch(
          "setMessage",
          {
            value: data.message,
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: "Введен неверный текущий пароль или другая ошибка",
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async remove(
      { dispatch }: ActionContext<State, any>,
      id: string
    ): Promise<void> {
      try {
        await $api.delete(`api/auth/${id}`);

        dispatch(
          "setMessage",
          {
            value: "Пользователь успешно удален",
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

    //для проверки при входе на сайт, вызывается один раз
    async checkAuth({ commit }: ActionContext<State, any>): Promise<void> {
      try {
        process.env.NODE_ENV === "production"
          ? (axios.defaults.baseURL = import.meta.env.VITE_DB_URL_HOSTING)
          : (axios.defaults.baseURL = import.meta.env.VITE_DB_URL);

        const { data } = await axios.get<AuthResponse>("api/auth/refresh", {
          withCredentials: true,
        });

        if (data.accessToken) {
          //добавляем в localStorage/token accessToken
          localStorage.setItem("token", data.accessToken);

          commit("setIsAuth");
          commit("setToken", data.accessToken);
          commit("setUser", data.user);
        }
      } catch (e) {
        //необходимо очистить isAuth в store
        commit("clearIsAuth");

        //удалить токен
        localStorage.removeItem("token");

        router.push("/auth?message=auth");
      }
    },
  },
  getters: {
    token(state: State) {
      return state.token;
    },
    isAuthenticated(_: State, getters: any) {
      return !!getters.token;
    },
    isAuth(state: State) {
      return state.isAuth;
    },
    user(state: State) {
      return state.user;
    },
    users(state: State) {
      return state.users;
    },
  },
};
