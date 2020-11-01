import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ArticleApi } from "@lib/api";

const Wrapper = styled.div`
  padding: 0 30px;
  box-sizing: border-box;

  .article-title {
    font-size: 32px;
  }
  .article-body {
    width: 100%;

    .article-item {
      position: relative;
      margin: 0 auto 20px;
      padding: 16px 20px;
      width: 100%;
      overflow: hidden;
      border-radius: 0.25rem;
      box-shadow: var(--box-shadow);
      box-sizing: border-box;
      transition: all 0.3s;
      background-color: var(--background-color);
      cursor: pointer;
      &:hover {
        box-shadow: var(--box-shadow-hover);
      }

      .img-wrapper {

      }
      .info-wrapper {
        .info-title {}
        .info-desc {
          .desc-name {}
          .desc-views {}
          .desc-time {}
        }
      }
    }
  }
`;

interface IRecommenProps {
  articleId?: number;
}

const Recommend: React.FunctionComponent<IRecommenProps> = ({ articleId }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    ArticleApi.getArticles({ page: 1, pageSize: 5, status: "publish" }).then(
      (res) => {
        if (res && res["success"]) {
          console.log(res.data.data);
          setArticles(res.data.data);
        }
      }
    );
  }, [articleId]);
  return (
    <Wrapper>
      <p className="article-title">最新文章</p>
      <div className="article-body">
        {articles.map((article) => {
          return (
            <div className="article-item" key={article.id}>
              <div className="img-wrapper">
                {article.cover ? <img src={article.cover} alt="" /> : null}
              </div>
              <div className="info-wrapper">
                <p className="info-title">{article.title}</p>
                <p className="info-desc">
                  <em className="desc-name">{article.cover}</em>
                  <em className="desc-views">{article.views}</em>
                  <span className="desc-time">{article.updateAt}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Recommend;
