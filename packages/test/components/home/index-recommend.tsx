import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ArticleApi } from "@lib/api";

import ArticleList from "@common/article-list";

const Wrapper = styled.div`
  padding: 0 30px;
  box-sizing: border-box;

  .article-title {
    font-size: 36px;
    line-height: 36px;
    text-align: center;
  }
`;

interface IRecommenProps {
  articleId?: number;
}

const Recommend: React.FunctionComponent<IRecommenProps> = ({ articleId }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    ArticleApi.getArticles({
      page: 1,
      pageSize: 5,
      status: "publish",
    }).then((data) => {
      console.log(data)
      // setArticles(articles);
    });
  }, [articleId]);
  return (
    <Wrapper>
      <h2 className="article-title">最新文章</h2>

      <ArticleList articles={articles} />
    </Wrapper>
  );
};

export default Recommend;
