import React from "react";
import { Switch, Route } from "react-router-dom";
import RouterGuard from "./routeGuard";

export class Routes {
  public title: string;
  public component?: any;
  public path?: string;
  public exact?: boolean;
  public render?: Function;
  public beforeEnter?: (routeProps: any, extraProps: any) => any;
  public routes?: Array<Routes>;
}

export const routes: Routes[] = [
  // {
  //   title: "根",
  //   path: "/",
  //   exact: false,
  //   beforeEnter: (routeProps, extraProps) => {}
  // },
  {
    title: "首页",
    path: "/web/index",
    exact: true,
    component: () => import("../components/home"),
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "admin",
    path: "/admin/index",
    exact: true,
    component: () => import("../components/home"),
    beforeEnter: (routeProps, extraProps) => {}
  },
  {
    title: "个人中心",
    path: "/user",
    exact: true,
    component: () => import("../components/user"),
    beforeEnter: (routeProps, extraProps) => {},
    routes: [
      {
        title: "user1",
        path: "/user/user1",
        exact: true,
        component: () => import("../components/user1")
      }
    ]
  },
  {
    title: "notFound",
    exact: true,
    component: () => import("../components/notFound")
  }
];

export const renderRoutes = (routes: Routes[]) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={`key${index}`}
            path={route.path}
            exact={route.exact}
            render={props => <RouterGuard {...route} {...props} />}
          />
        );
      })}
    </Switch>
  );
};
export default class RouteView extends React.PureComponent {
  public routes: Routes[] = routes;

  public render() {
    return <>{renderRoutes(this.routes)}</>;
  }
}
