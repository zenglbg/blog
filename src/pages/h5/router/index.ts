import { createRouter, createWebHistory } from "vue-router";
import { h } from "vue";
import RouteView from "./RouteView.vue";

import HomeIndex from "../views/index/index.vue";
import HomeService from "../views/service/index.vue";
import HomeConcat from "../views/concat/index.vue";

const routes = [
  {
    path: process.env.NODE_ENV === "development" ? "/h5" : "/:pathMatch(.*)",
    redirect: "/h5/index",
  },
  {
    path: "/h5",
    component: RouteView,
    redirect: "/h5/index",
    children: [
      { path: "index", name: "index", component: HomeIndex },
      { path: "service", name: "service", component: HomeService },
      { path: "concat", name: "concat", component: HomeConcat },
    ],
  },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
