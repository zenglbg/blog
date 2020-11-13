import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "@common/header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  main {
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
  children,
  setting = {},
  pages = [],
  needLayoutFooter,
}) => {
  const menus = [
    ...defaultMenus,
    ...pages.map((r) => ({
      path: `/page/${r.path}`,
      label: r.name,
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

      <main>{children}</main>

      {needLayoutFooter ? <footer></footer> : null}
    </Wrapper>
  );
};

export default Layout;
