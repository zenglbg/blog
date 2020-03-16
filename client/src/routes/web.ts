import { Loadable } from "@utils";

const web_home = Loadable(() => import("../components/web/home"));
const web_archive = Loadable(() => import("../components/web/archive"));

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
  }
];
