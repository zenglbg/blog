import React, { Component } from "react";

interface Props {}
interface State {}

import WebLayout from "../../common/webLayout";

export default class home extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="home">
        <WebLayout>
          <h1>home</h1>
        </WebLayout>
      </div>
    );
  }
}
