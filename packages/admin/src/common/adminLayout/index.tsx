import "./index.scss";

import React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Menu, Layout, Dropdown, Button, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { IState } from "@reducer/index";
import { menus } from "../../routes/config";

import { UserInfo } from "./index-user";
import { IRoutes } from "../../routes/config";
interface IAdminLayoutProps {
  routesRenderMsp: Function;
  routes?: IRoutes[];
}

const findActiveMenu = (pathname) => {
  return menus.find((menu) => menu.path === pathname);
};

const ResourceCreate = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={"/editor/article"} target="_blank">
          <span>新建文章</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={"/editor/page"} target="_blank">
          <span>新建页面</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button
        style={{ width: "100%" }}
        type="primary"
        size="large"
        icon={<SmileOutlined />}
      >
        新建
      </Button>
    </Dropdown>
  );
};

const AdminLayout: React.FunctionComponent<
  IAdminLayoutProps & RouteComponentProps & Pick<IState, "user">
> = ({
  children,
  history,
  location,
  match,
  user,
  routesRenderMsp,
  routes,
}) => {
  const { pathname } = history.location;
  const activeMenu = findActiveMenu(pathname);

  
  return (
    <Layout className="admin-layout">
      <div className="admin-layout-container">
        <aside className="admin-layout-container-asider">
          <div className="logo">管理后台</div>
          <div className="resourceCreate">
            <ResourceCreate />
          </div>
          <nav className="menus">
            <ul>
              {menus
                .filter((m: any) => !m.ignore)
                .map((menu, index) => {
                  return menu.divider ? (
                    <div className="divider" key={`${index}adminlayout`}></div>
                  ) : (
                    <li key={`${index}adminlayout`}>
                      <Link to={menu.path} className="active">
                        <SmileOutlined type={menu.icon} />
                        <span>{menu.label}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </aside>

        <div className="admin-layout-container-main">
          <header>
            <Row>
              <Col span={12}>
                <div className="title">{activeMenu && activeMenu.label}</div>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <div className="info">
                  <a
                    className="github"
                    href="https://github.com/zhxuc/wipi"
                    target="_blank"
                  >
                    <SmileOutlined type="github" />
                    <span></span>
                  </a>
                  <UserInfo
                    history={history}
                    location={location}
                    match={match}
                    user={user}
                  />
                </div>
              </Col>
            </Row>
          </header>
          <article>
            <div>{routes ? routesRenderMsp(routes) : null}</div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default connect(({ user }: IState) => ({
  user,
}))(AdminLayout);
