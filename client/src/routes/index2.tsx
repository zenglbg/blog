import React, { ReactElement } from "react";
import { Loadable } from "@utils";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { admins } from "./admin";
import { webs } from "./web";

export class Routes {
  public title?: string;
  public component?: any;
  public path?: string;
  public menu?: boolean;
  public exact?: boolean;
  public render?: Function;
  public beforeEnter?: (routeProps: any, extraProps: any) => any;
  public routes?: Array<Routes>;
}

const AdminLayout = Loadable(() => import("../components/common/adminLayout"));
const WebLayout = Loadable(() => import("../components/common/webLayout"));
const admin_login = Loadable(() => import("../components/admin/login"));

export const routes = [
  {
    path: "/admin",
    component: AdminLayout,
    routes: admins
  },
  {
    path: "/web",
    component: WebLayout,
    routes: webs
  },
  {
    title: "登录",
    path: "/login",
    exact: true,
    menu: false,
    component: admin_login,
    beforeEnter: (routeProps, extraProps) => {}
  }
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
            ? route.component
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
        <Route exact path="/" render={() => <Redirect to="/web/1" push />} />
        {this.routesRenderMsp(this.routes)}
      </div>
    );
  }
}
