import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import IconFont from "@common/icon-font";

const Wrapper = styled.div`
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
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;

    .img-wrapper {
      flex: 0 0 auto;
      width: 220px;
      margin-right: 1rem;
      border-radius: var(--border-radius);
      overflow: hidden;

      img {
        transition: all 0.5s;
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info-wrapper {
      flex: 1;
      overflow: hidden;
      .info-title {
        position: relative;
        color: var(--main-text-color);
        font-weight: 600;
        font-size: 20px;
        line-height: 1.4;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .info-desc {
        max-width: 100%;
        font-size: 14px;
        margin: 0;
        color: var(--second-text-color);

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .info-meta {
        width: 100%;
        margin: 1rem 0 0;
        font-size: 14px;
        color: var(--second-text-color);
        clear: both;

        .seperator {
          margin: 0 4px;
        }

        .pullRight {
          float: right;
        }
      }
    }

    &:hover {
      box-shadow: var(--box-shadow-hover);

      .img-wrapper img {
        transform: scale(1.3);
      }
    }
  }
`;
interface IArticleListProps {
  articles: IArticle[];
}

const ArticleList: React.FunctionComponent<IArticleListProps> = ({
  articles = [],
}) => {
  return (
    <Wrapper>
      {articles.map((article) => {
        return (
          <div className="article-item" key={article.id}>
            <div className="img-wrapper">
              {article.cover ? <img src={article.cover} alt="" /> : null}
            </div>
            <div className="info-wrapper">
              <p className="info-title">{article.title}</p>
              <p className="info-desc">{article.summary}</p>
              <div className="info-meta">
                {article.category ? (
                  <>
                    <IconFont type="icon-MissingMetadata-1" />
                    <span className="category">{article.category.label}</span>
                    <span className="seperator">·</span>
                  </>
                ) : null}
                <span>
                  <IconFont type="icon-Views" />
                  {article.views} 次阅读
                </span>

                <span className="pullRight">
                  <IconFont type="icon-time" />
                  {dayjs(article.publishAt).format(`YYYY-MM-DD HH:mm:ss`)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default ArticleList;
