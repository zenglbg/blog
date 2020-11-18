import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  position: fixed;
  top: 68px;
  right: 0;
  height: 100vh;
  z-index: 9991;

  .ant-drawer-body {
    background-color: var(--bg);
    padding: 0;
  }

  ul {
    overflow-y: scroll;
  }
`;

const Article = styled.li`
  padding: 1.2rem 1.6rem;
  &:hover {
    background-color: var(--bg-hover);
    transition: background-color 0.2s ease-out 0s;
  }

  .title {
    color: rgb(0, 150, 94);
    font-weight: 600;
    font-size: 0.75rem;
  }

  .subtitle {
    color: var(--main-text-color);
    word-break: break-all;
    max-height: 4rem;
    overflow: hidden;
  }

  .content {
    color: var(--second-text-color);
    max-height: 6em;
    font-size: 0.75rem;
    overflow: hidden;
  }
`;

interface IDrawerBoxProps {
  searchList: IArticle[];
  keyword: string;
  setKeyword: Function;
}

const DrawerBox: React.FunctionComponent<IDrawerBoxProps> = ({
  searchList,
  keyword,
  setKeyword
}) => {
  return (
    <Wrapper>
      <Drawer
        title=""
        width={420}
        placement="right"
        closable={false}
        visible={!!keyword}
        getContainer={false}
        style={{
          position: "absolute",
        }}
      >
        <ul>
          {searchList.map((article) => {
            return (
              <Link
                key={article.id}
                href="/article/id"
                as={`/article/${article.id}`}
              >
                <Article onClick={() => setKeyword("")}>
                  <p className="title">{article.title}</p>
                  <p className="subtitle">{article.summary}</p>
                  <p
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: article.content,
                    }}
                  ></p>
                </Article>
              </Link>
            );
          })}
        </ul>
      </Drawer>
    </Wrapper>
  );
};

export default DrawerBox;
