import React from "react";
import { BackTop, Switch } from "antd";
import { Helmet } from "react-helmet";
import Header from "@components/Header";
import Footer from "@components/Footer";

interface ILayoutProps {}

const defaultMenus = [
  {
    label: "首页",
    path: "/",
    dynamicPath: "/[tag]",
  },

  {
    label: "归档",
    path: "/archives",
  },
];

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <Header setting={{}} menus={defaultMenus} />
      <main>{children}</main>
      <Footer setting={{}} />
    </div>
  );
};

export default Layout;
