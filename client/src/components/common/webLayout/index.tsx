import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
interface Props {}
interface State {}

import RHeader from "./child/header";

export default class WebLayout extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <Layout>
          <RHeader />
          {this.props.children}
        </Layout>
      </div>
    );
  }
}
