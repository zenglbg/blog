import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import styled from "styled-components";
const Wrapper = styled.div`
  position: fixed;
  top: 68px;
  right: 0;
  height: 100vh;

  .ant-drawer-body {
    background-color: var(--bg);
    padding: 0;
  }
`;

const Article = styled.div`
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
    font-size: .75rem;
    overflow: hidden;
  }
`;

interface IDrawerBoxProps {
  searchList: IArticle[];
  keyword: string;
}

const DrawerBox: React.FunctionComponent<IDrawerBoxProps> = ({
  searchList,
  keyword,
}) => {
  console.log(searchList);
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
        {searchList.map((article) => {
          return (
            <Article key={article.id}>
              <p className="title">{article.title}</p>
              <p className="subtitle">{article.summary}</p>
              <p
                className="content"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              ></p>
            </Article>
          );
        })}
      </Drawer>
    </Wrapper>
  );
};

export default DrawerBox;
