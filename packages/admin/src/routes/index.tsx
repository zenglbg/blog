import React, { ReactElement } from "react";
import loadable from "@loadable/component";
import { admins } from "./config";
import { Route, Redirect, RouteComponentProps, Switch } from "react-router-dom";
import requireLogin from "./requireLogin";
export * from "./config";

export class Routes {
  public title?: string;
  public component?: any;
  public path?: string;
  public menu?: boolean;
  public exact?: boolean;
  public render?: Function;
  public label?: string;
  public ignore?: boolean;
  public beforeEnter?: (routeProps: any, extraProps: any) => any;
  public routes?: Array<Routes>;
}

const AdminLayout = loadable(() => import("../common/adminLayout"));

const admin_login = loadable(() => import("../components/login"));
const admin_register = loadable(() => import("../components/register"));

export const routes = [
  {
    path: "/admin",
    component: AdminLayout,
    routes: admins,
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

interface Props {}

export default class RouteView extends React.PureComponent<Props> {
  public routes: Routes[] = routes;
  private routesRenderMsp = (routes: Routes[]) => {
    return routes.map((route: Routes, index) => (
      <Route
        key={`key${route.path}`}
        path={route.path}
        exact={route.exact}
        render={(props: RouteComponentProps) => {
          const Component = route.path.includes("/admin")
            ? requireLogin(route.component)
            : route.component;
          return (
            <Component {...props}>
              {route.routes ? this.routesRenderMsp(route.routes) : null}
            </Component>
          );
        }}
      />
    ));
  };

  public render() {
    return (
      <div className="route">
        <Switch>{this.routesRenderMsp(this.routes)}</Switch>
      </div>
    );
  }
}
