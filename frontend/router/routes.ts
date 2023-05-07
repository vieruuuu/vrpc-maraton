import type { RouteRecordRaw } from "vue-router";

import DefaultLayout from "@/layouts/Default.vue";
import AuthLayout from "@/layouts/Auth.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: () => import("@/pages/Login.vue"),
        alias: "",
      },
      { path: "register", component: () => import("@/pages/Register.vue") },
    ],
  },

  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "home", component: () => import("@/pages/Home.vue") },
      { path: "quizzes", component: () => import("@/pages/Quizzes.vue") },
      { path: "games", component: () => import("@/pages/Games.vue") },
      { path: "account", component: () => import("@/pages/Account.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error404.vue"),
  },
] satisfies Readonly<RouteRecordRaw[]>;

export default routes;
