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
    console.log(this.props);
    return (
      <div className="home">
        <h1>admin</h1>
        <h2
          onClick={() => {
            this.props.history.push("/admin/login");
          }}
        >
          home
        </h2>
        {this.props.routes.map((item, index) => (
          <Route key={index} path={item.path} component={item.component} />
        ))}
      </div>
    );
  }
}
