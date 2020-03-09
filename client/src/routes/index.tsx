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
          },
          {
            title: "文章",
            path: "/admin/article",
            exact: true,
            component: () => import("../components/admin/article"),
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "收藏",
            path: "/admin/star",
            exact: true,
            component: () => import("../components/admin/star"),
            beforeEnter: (routeProps, extraProps) => {}
          },
          {
            title: "文章添加",
            path: "/admin/article-add",
            exact: true,
            component: () => import("../components/admin/article-add"),
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
    const LoadableComponent = Loadable({
      loader: component,
      loading: () => <span>11111</span>
    });
    return <LoadableComponent {...this.props} />;
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
        <WithRouterLoadable {...props} component={component} />
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
