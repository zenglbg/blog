import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "@common/header";
import { HomeFilled, EditFilled, FileZipFilled } from "@ant-design/icons";
import SearchBox from "./search-box";
import ThemeToggle from "./theme-toggle";
import DrawerBox from './drawer-box'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  .main-container {
    flex: 1;
    overflow-x: hidden;
  }
`;

interface ILayoutProps {
  needLayoutFooter: boolean;
  setting: any;
  pages: any;
}

const defaultMenus = [
  {
    label: "Home",
    path: "/home",
    icon: HomeFilled,
    dynamicPath: "/[tag]",
  },

  {
    label: "Blog",
    path: "/blog",
    icon: EditFilled,
    dynamicPath: "/[tag]",
  },
  {
    label: "Archive",
    path: "/archives",
    icon: FileZipFilled,
  },
];
const Layout: React.FunctionComponent<ILayoutProps> = ({
  children,
  setting = {},
  pages = [],
  needLayoutFooter,
}) => {
  const menus = [
    ...defaultMenus,
    ...pages[0].map((r) => ({
      path: r.path,
      label: r.name,
      icon: r.icon,
    })),
  ];
  return (
    <Wrapper>
      <Helmet>
        <title>{setting.systemTitle}</title>
        <meta name="keywords" content={setting.seoKeyword} />
        <meta name="description" content={setting.seoDesc} />
        <link
          rel="shortcut icon"
          href={setting.systemFavicon}
          type="image/x-icon"
        />
      </Helmet>
      <Header setting={setting} menus={menus} />

      <main className="main-container">{children}</main>


      <SearchBox />
      <DrawerBox />

      <ThemeToggle />


      {needLayoutFooter ? <footer></footer> : null}
    </Wrapper>
  );
};

export default Layout;
