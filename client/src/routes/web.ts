import { Loadable } from "@utils";

const web_home = Loadable(() => import("../components/web/home"));

export const webs = [
  {
    title: "首页",
    path: "/web/home",
    exact: true,
    menu: true,
    component: web_home,
    beforeEnter: (routeProps, extraProps) => {}
  }
];
