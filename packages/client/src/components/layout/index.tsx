import React from "react";
import { BackTop, Switch } from "antd";
import { Helmet } from "react-helmet";
import Header from "@components/Header";
import Footer from "@components/Footer";

interface ILayoutProps {
  backgroundColor?: string;
  needFooter?: boolean;
  setting?: any;
  pages?: any;
}

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

const Layout: React.FunctionComponent<ILayoutProps> = ({
  needFooter = true,
  children,
}) => {
  return (
    <div>
      <Header setting={{}} menus={defaultMenus} />
      <main>{children}</main>
      {needFooter ? <Footer setting={{}} /> : null}
    </div>
  );
};

export default Layout;
