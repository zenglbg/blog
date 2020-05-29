import loadable from "@loadable/component";

const admin_home = loadable(() => import("../components/home"));

export const admins = [
  {
    title: "首页",
    path: "/admin/home",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },
];
