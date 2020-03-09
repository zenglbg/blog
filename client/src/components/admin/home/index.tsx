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
  componentDidUpdate() {
    console.log(this.props);
  }
  handleClick = () => {
    this.props.history.push("/admin/login");
  };
  render() {
    return (
      <div>
        <AdminLayout>
          <h3 onClick={this.handleClick}>i'm content</h3>
        </AdminLayout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
