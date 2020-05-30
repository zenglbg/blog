import "./index.less";
import React, { Component, Children } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Layout, Icon, Avatar, Dropdown, Button } from "antd";
const { Header, Sider, Content, Footer } = Layout;
import { UserState, IState } from "@reducer/index";

interface IAdminLayoutProps {}

const AdminLayout: React.FunctionComponent<IAdminLayoutProps> = ({
  children,
}) => {
  return (
    <Layout id="admin-layout">
      <div className="admin-layout-container">
        <aside className="asider">
          <div className="logo">管理后台</div>
        </aside>

        <div className="main">
          <header></header>
          <article>
            <div>{children}</div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default connect(({ user }: IState) => ({
  user,
}))(AdminLayout);
