
import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Menu, Dropdown, Avatar } from "antd";
import { UserState, IState } from "@lib/redux/reducer/index";

const menus = [
  {
    label: "个人中心",
    icon: "user",
    path: "/ownspace",
  },
  // {
  //   icon: "user",
  //   label: "用户管理",
  //   path: "/user",
  // },

  // {
  //   icon: "setting",
  //   label: "系统设置",
  //   path: "/setting",
  // },
];

export const UserInfo = ({
  user,
}: RouteComponentProps & Pick<IState, "user">) => {
  useEffect(() => {
    /**
     * do someting
     */
  }, []);

  const menu = () => {
    return (
      <Menu>
        {menus.map((menu) => (
          <Menu.Item key={menu.path}>
            <Link to={menu.path}>
              <span>{menu.label}</span>
            </Link>
          </Menu.Item>
        ))}

        <Menu.Item>
          <Link to="/login">
            <span>退出登录</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={menu}>
      <div>
        {user.isLogin ? (
          <Avatar size={"small"} src={user.avatar} />
        ) : (
          <Avatar size={"small"} icon="user" />
        )}
        {user.isLogin ? (
          <span style={{ marginLeft: 8 }}>Hi, {user.name}</span>
        ) : null}
      </div>
    </Dropdown>
  );
};
