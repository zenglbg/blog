import "./index.less";

import React from "react";
import { connect } from "react-redux";
import { DispatchProp } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Menu, Layout, Dropdown, Button, Row, Col } from "antd";
import { GithubFilled, SmileFilled } from "@ant-design/icons";
import { IState } from "@reducer";
import { ActionArticle } from "@actions";
import { menus } from "../../routes/config";

import { UserInfo } from "./index-user";
import { IRoutes } from "../../routes/config";

interface IAdminLayoutProps {
  routesRenderMsp: Function;
  routes?: IRoutes[];
}

const findActiveMenu = (pathname: string) => {
  return menus.find((menu) => menu.path === pathname);
};

const ResourceCreate = ({ handleArticle }: any) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={"/editor/article"} onClick={handleArticle} target="__blank">
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
        icon={<SmileFilled />}
      >
        新建
      </Button>
    </Dropdown>
  );
};

const AdminLayout: React.FunctionComponent<
  IAdminLayoutProps & RouteComponentProps & Pick<IState, "user"> & DispatchProp
> = ({
  children,
  history,
  location,
  match,
  user,
  routesRenderMsp,
  routes,
  dispatch,
}) => {
  const { pathname } = history.location;
  const activeMenu = findActiveMenu(pathname);

  const handleArticle = () => {
    dispatch(ActionArticle.handleId(null));
  };

  return (
    <Layout className="admin-layout">
      <div className="admin-layout-container">
        <aside className="admin-layout-container-asider">
          <div className="logo">管理后台</div>
          <div className="resourceCreate">
            <ResourceCreate handleArticle={handleArticle} />
          </div>
          <nav className="menus">
            <ul>
              {menus
                .filter((m: any) => !m.ignore)
                .map((menu, index) => {
                  const Icon: any = menu.icon;
                  return menu.divider ? (
                    <div className="divider" key={`${index}adminlayout`}></div>
                  ) : (
                    <li key={`${index}adminlayout`}>
                      <Link to={menu.path} className="active">
                        <Icon />
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
                    <GithubFilled />
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
