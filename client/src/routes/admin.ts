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

const admin_options = Loadable(() => import("../components/admin/options"));

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
  {
    title: "网管管理",
    path: "/admin/option",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "用户管理",
    path: "/admin/user",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
    routes: [
      {
        title: "用户管理1",
        path: "/admin/user1",
        exact: true,
        menu: true,
        icon: "home",
        component: admin_options,
        beforeEnter: (routeProps, extraProps) => {},
      },
      {
        title: "用户管理",
        path: "/admin/user1",
        exact: true,
        menu: true,
        icon: "home",
        component: admin_options,
        beforeEnter: (routeProps, extraProps) => {},
      },
    ],
  },
  {
    title: "文章管理13",
    path: "/admin/article",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "评论管理",
    path: "/admin/comment",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "分类管理",
    path: "/admin/sort",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "标签管理",
    path: "/admin/label",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "论坛管理",
    path: "/admin/post",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "菜单管理",
    path: "/admin/menu",
    exact: true,
    menu: true,
    icon: "home",
    component: admin_options,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "友链管理",
    path: "/admin/star",
    exact: true,
    menu: true,
    icon: "star",
    component: admin_star,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "文章",
    path: "/admin/article1",
    exact: true,
    menu: true,
    icon: "home",

    component: admin_article,
    beforeEnter: (routeProps, extraProps) => {},
  },

  {
    title: "标签",
    path: "/admin/tags",
    exact: true,
    menu: true,
    icon: "home",

    component: admin_tag,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "分类",
    path: "/admin/category",
    exact: true,
    menu: true,
    icon: "home",

    component: admin_category,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "文章添加",
    path: "/admin/article-add/",
    exact: true,
    menu: false,
    icon: "home",

    component: admin_articleAdd,
    beforeEnter: (routeProps, extraProps) => {},
  },
];
