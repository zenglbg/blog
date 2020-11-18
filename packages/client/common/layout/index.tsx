import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "@common/header";
import { HomeFilled, EditFilled, FileZipFilled } from "@ant-design/icons";
import SearchBox from "./search-box";
import ThemeToggle from "./theme-toggle";
import DrawerBox from "./drawer-box";
import { ArticleApi, SearchApi } from "@lib/api";
import { debounce } from "lodash";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  .main-container {
    flex: 1;
    overflow-x: hidden;
    background-color: var(--bg);
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
      path: `/page/${r.id}`,
      label: r.name,
      icon: r.icon,
    })),
  ];

  const [searchList, setSearchList] = useState<IArticle[] | null>([]);
  const [keyword, setKeyword] = useState(null);
  const onSearch = debounce((keyword) => {
    setKeyword(keyword);
    SearchApi.searchArticles(keyword).then((data) => {
      return setSearchList(data);
    });
  }, 200);

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

      <SearchBox onSearch={onSearch} />
      <DrawerBox
        searchList={searchList}
        setKeyword={setKeyword}
        keyword={keyword}
      />

      <ThemeToggle />

      {needLayoutFooter ? <footer></footer> : null}
    </Wrapper>
  );
};

export default Layout;