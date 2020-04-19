import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Layout, Icon, Avatar, Dropdown } from "antd";
const { Header, Sider, Content, Footer } = Layout;
import { UserState, IState } from "@reducer";
import { admins } from "../../../routes/admin";
import "./index.less";
import SubMenu from "antd/lib/menu/SubMenu";
import { spawn } from "child_process";

/**
 * @todo 引入less 报错
 */
interface Props {
  user: UserState;
}
interface State {
  collapsed: boolean;
}

@(connect(({ user }: IState) => ({
  user,
})) as any)
export default class AdminLayout extends Component<Props, State> {
  state = { collapsed: false };

  componentDidMount() {
    const { isLogin } = this.props.user;
    if (!isLogin) {
      /**
       * 如果isLogin 成功为true , 则render 返回null
       */
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleClickMenuItem = (item: any) => {
    sessionStorage.setItem("menuItmeKey", item.key);
  };

  menuItem = (routes) =>
    routes.map((item, index) => {
      return !item.menu ? null : item.routes ? (
        <SubMenu
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
          key={`${item.title}admin`}
        >
          {this.menuItem(item.routes)}
        </SubMenu>
      ) : (
        <Menu.Item
          key={`${item.title}admin`}
          onClick={() => {
            this.handleClickMenuItem(item);
          }}
        >
          <Link to={item.path}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      );
    });

  render() {
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
                sessionStorage.getItem("menuItmeKey") || "0",
              ]}
            >
              {this.menuItem(admins)}
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
                  {this.props.user.user_name}
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
