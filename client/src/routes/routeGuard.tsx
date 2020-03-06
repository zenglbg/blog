import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Loadable from "react-loadable";
import { Routes, renderRoutes } from "./index";

interface Props {
  authorization?: any;
}

type IProps = Props & RouteComponentProps & Routes;

class RouterGuard extends React.Component<IProps> {
  public UNSAFE_componentWillMount() {
    const {
      history: { replace },
      authorization,
      location,
      beforeEnter
    } = this.props;
    /**
     * authorization 为验证是否登录
     */

    if (authorization) replace("./login");

    if (location.pathname === "/") replace("/admin/login");
    // 跳转前执行函数
    beforeEnter && beforeEnter(1, 1);
    console.log("路由跳转前的拦截", this.props);
  }

  public componentDidMount() {
    // const {} = this.props;
    console.log("路由跳转后", this.props);
  }

  public render() {
    const { component, routes } = this.props;
    console.log("准备渲染compoent前", this.props);
    const LoadableComponent = Loadable({
      loader: component,
      loading: () => <span>11133311</span>
    });

    return (
      <div>
        <LoadableComponent {...this.props} />
        {routes ? renderRoutes(routes) : null}
      </div>
    );
  }
}

export default withRouter(RouterGuard);
