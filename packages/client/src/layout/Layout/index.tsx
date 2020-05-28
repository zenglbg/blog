import * as React from "react";
import { Helmet } from "react-helmet";
import { BackTop, Switch } from "antd";
import Footer from "@components/Footer";
import Header from "@components/Header";

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

interface ILayoutProps {
  backgroundColor?: string;
  needFooter?: boolean;
  setting: any;
  pages: any;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({
  children,
  needFooter = true,
  setting = {},
}) => {
  const menus = [...defaultMenus];

  return (
    <div>
      <Helmet>
        <title>{setting.systemTitle}</title>
        <meta name="keyword" content={setting.seoKeyword} />
        <meta name="description" content={setting.seoDesc} />
        <link rel="shortcut icon" href={setting.systemFavicon} />
        <link
          href="//fonts.googleapis.com/css?family=Nunito:400,400i,700,700i&amp;display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>

      <Header setting={setting} menus={menus} />
      <main>{children}</main>

      <BackTop />

      {needFooter && <Footer setting={setting} />}
    </div>
  );
};

export default Layout;
