import { Loadable } from "@utils";

const web_home = Loadable(() => import("../components/web/home"));
const web_archive = Loadable(() => import("../components/web/archive"));
const web_detail = Loadable(() => import("../components/web/detail"));
const web_star = Loadable(() => import("../components/web/star"));
const web_about = Loadable(() => import("../components/web/about"));

export const webs = [
  {
    title: "首页",
    path: "/web/home",
    exact: true,
    menu: true,
    icon: "home",
    component: web_home,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "归档",
    path: "/web/archive",
    exact: true,
    menu: true,
    icon: "edit",
    component: web_archive,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "收藏",
    path: "/web/star",
    exact: true,
    menu: true,
    icon: "star",
    component: web_star,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    icon: "team",
    title: "关于",
    path: "/web/about",
    exact: true,
    menu: true,
    component: web_about,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "文章",
    path: "/web/detail/:id",
    exact: true,
    menu: false,
    icon: "edit",
    component: web_detail,
    beforeEnter: (routeProps, extraProps) => {}
  }
];
