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
    children: [{ path: "home", component: () => import("@/pages/Home.vue") }],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error404.vue"),
  },
] satisfies Readonly<RouteRecordRaw[]>;

export default routes;
