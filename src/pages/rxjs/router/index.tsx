import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const history = createWebHistory();

import HomeIndex from "../views/home";
import RouterView from "./RouterView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)",
    redirect: "/rxjs",
  },
  {
    path: "/rxjs",
    component: RouterView,
    redirect: "/rxjs/index",
    children: [{ path: "/rxjs/index", component: HomeIndex }],
  },
];

const router = createRouter({
  history,
  routes,
});

export default router;
