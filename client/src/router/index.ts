import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        layout: "main",
        auth: true,
        access: ["user", "admin", "god"],
      },
    },
    {
      path: "/:id",
      name: "HomeCertificatePage",
      component: Home,
      meta: {
        layout: "main",
        auth: true,
        access: ["user", "admin", "god"],
      },
    },
    {
      path: "/auth",
      name: "Auth",
      component: () => import("../views/Auth.vue"),
      meta: {
        layout: "simple",
        auth: false,
        access: ["all", "user", "admin", "god"],
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("../views/Settings.vue"),
      meta: {
        layout: "main",
        auth: true,
        access: ["admin", "god"],
      },
    },
    {
      path: "/statistics",
      name: "Statistics",
      component: () => import("../views/Statistics.vue"),
      meta: {
        layout: "main",
        auth: true,
        access: ["admin", "god", "user"],
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        layout: "main",
        auth: true,
        access: ["user", "admin", "god"],
      },
    },
    {
      path: "/password",
      name: "Password",
      component: () => import("../views/Password.vue"),
      meta: {
        layout: "main",
        auth: true,
        access: ["user", "admin", "god"],
      },
    },
    {
      path: "/add-certificate",
      name: "Add Certificate",
      component: () => import("../views/AddCertificate.vue"),
      meta: {
        layout: "main",
        auth: true,
        access: ["admin", "god"],
      },
    },
    {
      path: "/privacy-policy",
      name: "Privacy Policy",
      component: () => import("../views/PrivacyPolicy.vue"),
      meta: {
        layout: "main",
        auth: false,
        access: ["all", "user", "admin", "god"],
      },
    },
    {
      path: "/certificate/:id",
      name: "Certificate",
      component: () => import("../views/Certificate.vue"),
      meta: {
        layout: "main",
        auth: false,
        access: ["all", "user", "admin", "god"],
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
      meta: {
        layout: "main",
        auth: true,
        access: ["all", "user", "admin", "god"],
      },
    },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;

  // если авторизация есть
  if (requireAuth && store.getters["auth/isAuthenticated"]) {
    //переходим на новую страницу
    next();
    //иначе если авторизация у пользователя отсутствует
  } else if (requireAuth && !store.getters["auth/isAuthenticated"]) {
    //пересылаем пользователя на страницу авторизации auth и выдаем сообщение
    next("/auth?message=auth");
  } else {
    next();
  }
});

router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
}).href;

export default router;
