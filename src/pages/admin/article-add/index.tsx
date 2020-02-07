import React, { Component } from "react";
import { connect } from "react-redux";

interface Props {}
interface State {}

export class ArticleAdd extends Component<Props, State> {
  state = {};

  render() {
    return <div>ArticleAdd</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAdd);
