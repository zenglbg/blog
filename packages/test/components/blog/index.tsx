import React, { useState, useEffect } from "react";
import ArticleList from "@common/article-list";
import styled from "styled-components";

const Wrapper = styled.div`
  .banner-wrapper {
    height: 24rem;
    background: pink;
  }

  .content {
    display: flex;
    justify-content: space-between;
    .content-left {
      width: 63%;
    }
    .content-right {
      width: 33%;
      background-color: pink;
    }
  }
`;

interface IBlogProps {
  articles: IArticle[];
  total: number;
}

const Blog: React.FunctionComponent<IBlogProps> = ({ articles, total }) => {
  return (
    <Wrapper>
      <div className="banner-wrapper">
        <p>tech and poems</p>
      </div>

      <div className="content">
        <div className="content-left">
          <ArticleList articles={articles} />
        </div>

        <div className="content-right"></div>
      </div>
    </Wrapper>
  );
};

export default Blog;
