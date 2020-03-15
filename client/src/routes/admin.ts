import { Loadable } from "@utils";

const admin_index = Loadable(() => import("../components/admin"));
const admin_home = Loadable(() => import("../components/admin/home"));
const admin_article = Loadable(() => import("../components/admin/article"));
const admin_star = Loadable(() => import("../components/admin/star"));
const admin_tag = Loadable(() => import("../components/admin/tag"));
const admin_category = Loadable(() => import("../components/admin/category"));
const admin_articleAdd = Loadable(() =>
  import("../components/admin/article-add")
);

export const admins = [
  {
    title: "首页",
    path: "/admin/home",
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {}
  },

  {
    title: "文章",
    path: "/admin/article",
    exact: true,
    menu: true,
    component: admin_article,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "收藏",
    path: "/admin/star",
    exact: true,
    menu: true,
    component: admin_star,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "标签",
    path: "/admin/tags",
    exact: true,
    menu: true,
    component: admin_tag,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "分类",
    path: "/admin/category",
    exact: true,
    menu: true,
    component: admin_category,
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "文章添加",
    path: "/admin/article-add/",
    exact: true,
    menu: false,
    component: admin_articleAdd,
    beforeEnter: (routeProps, extraProps) => {}
  }
];
