import React, { Component } from "react";

interface Props {}
interface State {}

export default class index extends Component<Props, State> {
  state = {};

  render() {
    console.log(this.props);
    return (
      <div className="home">
        <h1
          onClick={() => {
            (this.props as any).history.push("/");
          }}
        >
          home
        </h1>
        <h1
          onClick={() => {
            (this.props as any).history.push("/user");
          }}
        >
          user
        </h1>
        <h1
          onClick={() => {
            (this.props as any).history.push("/323231");
          }}
        >
          notFound
        </h1>
      </div>
    );
  }
}
