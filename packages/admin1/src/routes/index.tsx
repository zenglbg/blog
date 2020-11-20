import React from "react";
import { Route, RouteComponentProps, Switch, Redirect } from "react-router-dom";
import Auth from './index-auth'
import { routes, IRoutes } from "./config";

interface Props {}

export function RouteView() {
  const routesRenderMsp = (routes: IRoutes[]) => {
    return routes.map((route: IRoutes, index) => (
      <Route
        key={`key${route.path}`}
        path={route.path}
        exact={route.exact}
        render={(props: RouteComponentProps) => {
          const Component = route.component;
          return (
            <Component
              {...props}
              routes={route.routes}
              routesRenderMsp={routesRenderMsp}
            />
          );
        }}
      />
    ));
  };

  return (
    <Auth>
      <Switch>
        {routesRenderMsp(routes)}
        <Redirect to="/admin/home" />
      </Switch>
    </Auth>
  );
}
