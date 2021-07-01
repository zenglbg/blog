import { createRouter, createWebHistory } from "vue-router";
import HomeIndex from "../views/index/index.vue";
import HomeService from "../views/service/service.vue";
import HomeConcat from "../views/concat/concat.vue";
import RouteView from "./RouteView.vue";

const routes = [
  {
    path: process.env.NODE_ENV === "development" ? "/web" : "/:pathMatch(.*)",
    redirect: "/web/index",
  },
  {
    path: "/web",
    component: RouteView,
    redirect: "/web/index",
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
