import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import Loadable from "react-loadable";

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
  {
    title: "根",
    path: "/",
    exact: true,
    component: () => import("../container/App"),
    beforeEnter: (routeProps, extraProps) => {},
    routes: [
      {
        title: "首页",
        path: "/web/index",
        exact: true,
        component: () => import("../components/web/index"),
        beforeEnter: (routeProps, extraProps) => {}
      },
      {
        title: "admin",
        path: "/admin/index",
        exact: true,
        component: () => import("../components/admin/index"),
        beforeEnter: (routeProps, extraProps) => {},
        routes: [
          {
            title: "首页",
            path: "/admin/home",
            exact: false,
            component: () => import("../components/admin/home"),
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "登录",
            path: "/admin/login",
            exact: false,
            component: () => import("../components/admin/login"),
            beforeEnter: (routeProps, extraProps) => {}
          }
        ]
      }
      // {
      //   title: "notFound",
      //   exact: true,
      //   component: "../components/notFound"
      // }
    ]
  }
];

export default class RouteView extends React.PureComponent {
  public routes: Routes[] = routes;

  public Guard = ({
    component,
    routes,
    history
  }: Routes & RouteComponentProps) => {
    const LoadableComponent = Loadable({
      loader: component,
      loading: () => <span>11111</span>
    });

    return (
      <div>
        <LoadableComponent />
        {routes ? this.routesRenderMsp(routes) : null}
      </div>
    );
  };

  public routesRenderMsp = (routes: Routes[]) => {
    return routes.map((route: Routes, index) => (
      <Route
        key={`key${index}`}
        path={route.path}
        render={(props: RouteComponentProps) =>
          this.Guard({ ...route, ...props })
        }
      />
    ));
  };

  public render() {
    return <div className="route">{this.routesRenderMsp(this.routes)}</div>;
  }
}
