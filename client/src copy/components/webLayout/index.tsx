import React, { Component } from "react";
import { connect } from "react-redux";

interface Props {}
interface State {}

export class WebLayout extends Component<Props, State> {
  state = {};

  render() {
    return <div>webLayout</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WebLayout);
