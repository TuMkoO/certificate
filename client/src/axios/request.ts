import axios from "axios";
import router from "../router";
import store from "@/store";
import type { AuthResponse } from "@/types/response/AuthResponse";

const $api = axios.create({
  withCredentials: true,
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_DB_URL_HOSTING
      : import.meta.env.VITE_DB_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    //если ошибка 401 (нет авторизации)
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        import.meta.env.MODE === "production"
          ? (axios.defaults.baseURL = import.meta.env.VITE_DB_URL_HOSTING)
          : (axios.defaults.baseURL = import.meta.env.VITE_DB_URL);

        const { data } = await axios.get<AuthResponse>("api/auth/refresh", {
          withCredentials: true,
        });

        //добавляем в localStorage/token accessToken
        localStorage.setItem("token", data.accessToken);

        //необходимо передать новый токен в store, все запросы берут токен из store
        store.commit("auth/setToken", data.accessToken);

        return $api.request(originalRequest);
      } catch (e) {
        console.log("axios/request.js: НЕ АВТОРИЗОВАН");

        //необходимо очистить isAuth в store
        store.commit("auth/clearIsAuth");

        //удалить токен
        localStorage.removeItem("token");

        router.push("/auth?message=auth");
      }
    }

    //если недостаточно прав доступа
    if (error.response.status == 403) {
      router.push("/");
    }
    throw error;
  }
);

export default $api;
