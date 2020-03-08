import React from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import Loadable from "react-loadable";

interface IProps {}

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
    exact: false,
    component: () => import("../container/App"),
    beforeEnter: (routeProps, extraProps) => {},
    routes: [
      {
        title: "首页",
        path: "/web/index",
        exact: false,
        component: () => import("../components/web/index"),
        beforeEnter: (routeProps, extraProps) => {}
      },
      {
        title: "admin",
        path: "/admin",
        exact: false,
        component: () => import("../components/admin"),
        beforeEnter: (routeProps, extraProps) => {},
        routes: [
          {
            title: "首页",
            path: "/admin/home",
            exact: true,
            component: () => import("../components/admin/home"),
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "登录",
            path: "/admin/login",
            exact: true,
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
    history,
    ...props
  }: Routes & RouteComponentProps) => {
    console.log(routes);

    const LoadableComponent = Loadable({
      loader: component,
      loading: () => <span>11111</span>
    });
    return (
      <>
        <LoadableComponent />
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
