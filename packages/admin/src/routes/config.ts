import loadable from "@loadable/component";
import {
  DashboardFilled,
  FormatPainterFilled,
  CopyFilled,
  TagFilled,
  SnippetsFilled,
  MessageFilled,
  MailFilled,
  FolderFilled,
  SearchOutlined,
  ProjectFilled,
  UserOutlined,
  SettingFilled,
} from "@ant-design/icons";
export interface IRoutes {
  title?: string;
  component?: any;
  path?: string;
  menu?: boolean;
  exact?: boolean;
  render?: Function;
  label?: string;
  ignore?: boolean;
  beforeEnter?: (routeProps: any, extraProps: any) => any;
  routes?: Array<IRoutes>;
  layout?: boolean;
}
const AdminLayout = loadable(() => import("../common/adminLayout"));
const admin_login = loadable(() => import("../components/login"));
const admin_register = loadable(() => import("../components/register"));
const editor_article = loadable(() => import("../components/editor"));
const editor_page = loadable(() => import("../components/page"));

const admin_home = loadable(() => import("../components/home"));
const admin_pages = loadable(() => import("../components/pages"));
const admin_article = loadable(() => import("../components/article"));

const admin_category = loadable(() => import("../components/category"));
const admin_tags = loadable(() => import("../components/tags"));
const admin_user = loadable(() => import("../components/user"));
const admin_setting = loadable(() => import("../components/setting"));

export const menus = [
  {
    icon: DashboardFilled,
    path: "/admin/home",
    label: "工作台",
    title: "工作台",
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    divider: true,
  },
  {
    icon: FormatPainterFilled,
    label: "所有文章",
    title: "所有文章",
    path: "/admin/article",
    exact: true,
    menu: true,
    component: admin_article,
    beforeEnter: (routeProps, extraProps) => {},
  },

  {
    icon: CopyFilled,
    label: "分类管理",
    title: "分类管理",
    path: "/admin/article/category",
    exact: true,
    menu: true,
    component: admin_category,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    icon: TagFilled,
    label: "标签管理",
    title: "标签管理",
    path: "/admin/article/tags",
    exact: true,
    menu: true,
    component: admin_tags,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    divider: true,
  },
  {
    icon: SnippetsFilled,
    label: "所有页面",
    title: "所有页面",
    path: "/admin/page",
    exact: true,
    menu: true,
    component: admin_pages,
    beforeEnter: (routeProps, extraProps) => {},
  },

  {
    divider: true,
  },
  {
    icon: MessageFilled,
    label: "评论管理",
    title: "评论管理",
    path: "/admin/comment",
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    icon: MailFilled,
    label: "邮件管理",
    title: "邮件管理",
    path: "/admin/mail",
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    icon: FolderFilled,
    label: "文件管理",
    title: "文件管理",
    path: "/admin/file",
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    divider: true,
  },
  {
    icon: SearchOutlined,
    label: "搜索记录",
    title: "搜索记录",
    path: "/admin/search",
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },

  {
    icon: ProjectFilled,
    label: "访问统计",
    title: "访问统计",
    path: "/admin/view",
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    divider: true,
  },
  {
    icon: UserOutlined,
    label: "个人中心",
    title: "个人中心",
    path: "/admin/ownspace",
    ignore: true,
    exact: true,
    menu: true,
    component: admin_home,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    icon: UserOutlined,
    label: "用户管理",
    title: "用户管理",
    path: "/admin/user",
    exact: true,
    menu: true,
    component: admin_user,
    beforeEnter: (routeProps, extraProps) => {},
  },

  {
    icon: SettingFilled,
    label: "系统设置",
    title: "系统设置",
    path: "/admin/setting",
    exact: true,
    menu: true,
    component: admin_setting,
    beforeEnter: (routeProps, extraProps) => {},
  },
];


export const admins = menus.filter((item) => item.path);

export const routes = [
  {
    path: "/admin",
    component: AdminLayout,
    routes: admins,
  },
  {
    label: "新建页面",
    path: "/editor/page/:id",
    ignore: true,
    icon: "form",
    exact: true,
    menu: true,
    layout: true,
    component: editor_page,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    label: "新建页面",
    path: "/editor/page",
    ignore: true,
    icon: "form",
    exact: true,
    menu: true,
    layout: true,
    component: editor_page,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    label: "编辑文章",
    path: "/editor/article",
    ignore: true,
    icon: "form",
    title: "所有文章",
    exact: true,
    menu: true,
    component: editor_article,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    label: "编辑文章",
    path: "/editor/article/:id",
    ignore: true,
    icon: "form",
    title: "所有文章",
    exact: true,
    menu: true,
    component: editor_article,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "登录",
    path: "/login",
    exact: true,
    menu: false,
    component: admin_login,
    beforeEnter: (routeProps, extraProps) => {},
  },
  {
    title: "注册",
    path: "/register",
    exact: true,
    menu: false,
    component: admin_register,
    beforeEnter: (routeProps, extraProps) => {},
  },
];
