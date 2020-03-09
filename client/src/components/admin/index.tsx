import React, { Component } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
interface Props {
  routes: Array<any>;
}
interface State {}

export default class index extends Component<
  Props & RouteComponentProps,
  State
> {
  state = {};

  render() {
    return <div className="home"></div>;
  }
}
