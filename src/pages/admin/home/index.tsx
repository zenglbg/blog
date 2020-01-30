import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Layout, Icon, Avatar } from "antd";

const { Header, Sider, Content, Footer } = Layout;
import AdminLayout from "../../../components/adminLayout";

interface Props {
  user: any;
}
interface State {
  collapsed: string;
}

export class index extends Component<Props, State> {
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
  handleClick() {
    // this.props.history.push('/login')
  }
  render() {
    console.log(this.props.user);
    return (
      <div>
        <AdminLayout>
          <h3>i'm content</h3>
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
