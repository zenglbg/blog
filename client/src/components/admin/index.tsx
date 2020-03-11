import React, { Component } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { connect } from "react-redux";
import { IState } from "@reducer";
interface Props {
  routes: Array<any>;
}
interface State {}

@(connect(({ user }: IState) => ({
  user
})) as any)
export default class index extends Component<
  Props & RouteComponentProps & Pick<IState, "user">,
  State
> {
  state = {};
  componentWillMount() {
    if (!this.props.user.isLogin) {
      this.props.history.replace("/admin/login");
    }
  }

  render() {
    return <div className="home"></div>;
  }
}
