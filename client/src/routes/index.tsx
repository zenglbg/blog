import React from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { Loadable } from "../utils";

export class Routes {
  public title: string;
  public component?: any;
  public path?: string;
  public exact?: boolean;
  public render?: Function;
  public beforeEnter?: (routeProps: any, extraProps: any) => any;
  public routes?: Array<Routes>;
}

const App = Loadable(() => import("../container/App"));

const web_index = Loadable(() => import("../components/web"));
const web_home = Loadable(() => import("../components/web/home"));

const admin_index = Loadable(() => import("../components/admin"));
const admin_home = Loadable(() => import("../components/admin/home"));
const admin_login = Loadable(() => import("../components/admin/login"));
const admin_article = Loadable(() => import("../components/admin/article"));
const admin_star = Loadable(() => import("../components/admin/star"));
const admin_tag = Loadable(() => import("../components/admin/tag"));
const admin_category = Loadable(() => import("../components/admin/category"));
const admin_articleAdd = Loadable(() =>
  import("../components/admin/article-add")
);

export const routes: Routes[] = [
  {
    title: "根",
    path: "/",
    exact: false,
    component: App,
    beforeEnter: (routeProps, extraProps) => {},
    routes: [
      {
        title: "首页",
        path: "/web",
        exact: false,
        component: web_index,
        beforeEnter: (routeProps, extraProps) => {},
        routes: [
          {
            title: "首页",
            path: "/web/home",
            exact: true,
            component: web_home,
            beforeEnter: (routeProps, extraProps) => {}
          }
        ]
      },
      {
        title: "admin",
        path: "/admin",
        exact: false,
        component: admin_index,
        beforeEnter: (routeProps, extraProps) => {},
        routes: [
          {
            title: "首页",
            path: "/admin/home",
            exact: true,
            component: admin_home,
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "登录",
            path: "/admin/login",
            exact: true,
            component: admin_login,
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "文章",
            path: "/admin/article",
            exact: true,
            component: admin_article,
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "收藏",
            path: "/admin/star",
            exact: true,
            component: admin_star,
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "标签",
            path: "/admin/tags",
            exact: true,
            component: admin_tag,
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "分类",
            path: "/admin/category",
            exact: true,
            component: admin_category,
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "文章添加",
            path: "/admin/article-add/",
            exact: true,
            component: admin_articleAdd,
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "文章添加",
            path: "/admin/article-edit/:id",
            exact: true,
            component: admin_articleAdd,
            beforeEnter: (routeProps, extraProps) => {}
          }
        ]
      }
      // {
      //   title: "notFound",
      //   exact: true,
      //   component: "components/notFound"
      // }
    ]
  }
];

class LoadableView extends React.PureComponent<any> {
  public render() {
    const { component } = this.props;
    const LoadableComponent = component;

    return <LoadableComponent {...this.props}></LoadableComponent>;
  }
}

const WithRouterLoadable = withRouter(LoadableView);

export default class RouteView extends React.PureComponent {
  public routes: Routes[] = routes;

  public Guard = ({
    component,
    routes,
    history,
    ...props
  }: Routes & RouteComponentProps) => {
    return (
      <>
        <WithRouterLoadable
          {...props}
          component={component}
        ></WithRouterLoadable>
        {routes ? this.routesRenderMsp(routes) : null}
      </>
    );
  };

  public routesRenderMsp = (routes: Routes[]) => {
    return routes.map((route: Routes, index) => (
      <Route
        key={`key${route.path}`}
        path={route.path}
        exact={route.exact}
        render={(props: RouteComponentProps) =>
          this.Guard({ ...route, ...props })
        }
      />
    ));
  };

  public render() {
    return <Switch>{this.routesRenderMsp(this.routes)}</Switch>;
  }
}
