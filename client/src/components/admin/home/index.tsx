import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import AdminLayout from "../../common/adminLayout";

interface Props {
  user: any;
}
interface State {
  collapsed: string;
}

export class index extends Component<Props & RouteComponentProps, State> {
  state = {
    collapsed: ""
  };
  componentDidMount() {
    console.log(1, this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  handleClick = () => {
    this.props.history.push("/admin/login");
  };
  render() {
    return (
      <div>
        <h3 onClick={this.handleClick}>i'm content</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
