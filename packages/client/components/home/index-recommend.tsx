import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ArticleApi } from "@lib/api";
import recommend from './images/recommend.png'

import ArticleList from "@common/article-list";

const Wrapper = styled.div`
  padding: 0 30px;
  box-sizing: border-box;
  max-width: 44.25rem;
  margin: 0 auto;

  .article-title {
    font-size: 1rem;
    line-height: 36px;
    text-align: center;
    margin: 3rem 0 1rem;
    text-align: left;
    padding-left: 2.1rem;
    border-bottom: 1px dashed var(--border-color);
    padding-bottom: 0.5rem;
    background: url(${recommend}) no-repeat left .5rem / 1.5rem 1rem;
  }
`;

interface IRecommenProps {
  articles: IArticle[];
}

const Recommend: React.FunctionComponent<IRecommenProps> = ({ articles }) => {
  return (
    <Wrapper>
      <h2 className="article-title">最新文章</h2>

      <ArticleList articles={articles} />
    </Wrapper>
  );
};

export default Recommend;
