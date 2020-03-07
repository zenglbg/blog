//routerGuard.js
export const a = 1;
// return;
// import React from "react";
// import { withRouter, RouteComponentProps } from "react-router-dom";
// import Loadable from "react-loadable";
// import { connect } from "react-redux";
// import { renderRoutes, Routes } from "./index";

// const mapStateToProps = state => state;
// const mapDispatchToProps = dispatch => ({ ...dispatch });

// interface Props {
//   authorization: any;
// }

// interface State {}

// class RouterGuard extends React.Component<
//   Props & Routes & RouteComponentProps,
//   State
// > {
//   constructor(props) {
//     super(props);
//   }
//   componentWillMount() {
//     let {
//       history: { replace },
//       authorization,
//       location
//     } = this.props;
//     // if (authorization) replace("./login");
//     // if (location.pathname === "/") replace("./asd");
//     // console.log("路由跳转前的拦截", this.props);
//   }
//   render() {
//     let { component, routes = [] } = this.props;
//     console.log("准备渲染compoent前", this.props);
//     const LoadableComponent = Loadable({
//       loader: () => import(`../${component}`),
//       loading: () => <span>11111</span>
//     });
//     return (
//       <div>
//         <LoadableComponent {...this.props} />
//         {renderRoutes(routes)}
//       </div>
//     );
//   }
// }

// export default withRouter(RouterGuard);
