import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import requireLogin from "./requireLogin";
import { routes, IRoutes } from "./config";
export * from "./config";

interface Props {}
// route.path.includes("/admin")
export default class RouteView extends React.PureComponent<Props> {
  public routes: IRoutes[] = routes;
  private routesRenderMsp = (routes: IRoutes[]) => {
    return routes.map((route: IRoutes, index) => (
      <Route
        key={`key${route.path}`}
        path={route.path}
        exact={route.exact}
        render={(props: RouteComponentProps) => {
          const Component = /(\/admin|\/editor)/g.test(route.path)
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
