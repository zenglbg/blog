import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Layout, Icon, Avatar, Dropdown } from "antd";
const { Header, Sider, Content, Footer } = Layout;
import { UserState } from "../../redux/reducer";
import Router from "next/router";
import Link from "next/link";
import adminRoutes from "../../config/adminRoutes";
import "./index.less";
/**
 * @todo 引入less 报错
 */
interface Props {
  user: UserState;
}
interface State {
  collapsed: boolean;
}

export class AdminLayout extends Component<Props, State> {
  state = { collapsed: false };

  componentDidMount() {
    const { isLogin } = this.props.user;
    if (!isLogin) {
      /**
       * 如果isLogin 成功为true , 则render 返回null
       */
      Router.push("/admin/login");
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleClickMenuItem = (item: any) => {};

  menuItem = () =>
    adminRoutes.map((item, index) => (
      <Menu.Item key={index} onClick={item => this.handleClickMenuItem(item)}>
        <a href={item.path}>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </a>
      </Menu.Item>
    ));

  render() {
    console.log(this.props.user);
    const { isLogin } = this.props.user;
    const logoClass = this.state.collapsed ? "logoMin" : "logoMax";
    const menu = (
      <Menu>
        <Menu.Item key="1">login out</Menu.Item>
      </Menu>
    );
    return isLogin ? (
      <div id="adminLayout">
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className={logoClass}></div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[
                sessionStorage.getItem("menuItmeKey") || "0"
              ]}
            >
              {this.menuItem()}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              ></Icon>
              <span className="user">
                <Avatar style={{ backgroundColor: "#f56a00" }}>
                  {this.props.user.user}
                </Avatar>
                <Dropdown overlay={menu} className="ml10">
                  <Icon type="down" />
                </Dropdown>
              </span>
            </Header>

            <Layout>
              <div className="wrap-content">
                <Content className="content">{this.props.children}</Content>
              </div>
            </Layout>
            {/* <Footer>footer</Footer> */}
          </Layout>
        </Layout>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
