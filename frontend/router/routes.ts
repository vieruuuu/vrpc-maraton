import type { RouteRecordRaw } from "vue-router";

import DefaultLayout from "@/layouts/Default.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: () => import("@/pages/HomeCompany.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error404.vue"),
  },
] satisfies Readonly<RouteRecordRaw[]>;

export default routes;
