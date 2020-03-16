import "./index.less";
import React, { useState } from "react";
import { Layout, Row, Col, Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { webs } from "@routes";

export default function header(props) {
  const menuList = webs.map((route, index) => {
    if (route.menu) {
      return (
        <Menu.Item
          key={index}
          onClick={() => sessionStorage.setItem("webKey", "0")}
        >
          <NavLink to={route.path}>
            <Icon type={route.icon} />
            <span className="nav-text">{route.title}</span>
          </NavLink>
        </Menu.Item>
      );
    }
  });

  const key = sessionStorage.getItem("webKey") || "0";

  return (
    <Layout.Header className="header-box">
      <Row>
        <Col lg={{ span: 4 }} md={{ span: 4 }} xs={{ span: 0 }}>
          <div className="logo">
            <Icon type="smile" theme="twoTone" />
            圈圈的博客
          </div>
        </Col>
        <Col
          lg={{ span: 14 }}
          md={{ span: 14 }}
          xs={{ span: 24 }}
          className="mobile"
        >
          <Menu mode="horizontal" defaultSelectedKeys={[key]}>
            {menuList}
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  );
}
