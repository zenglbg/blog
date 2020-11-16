import React, { useState, useEffect } from "react";
import ArticleList from "@common/article-list";
import styled, { StyledFunction } from "styled-components";
import { withProps, styledComponentWithProps } from "@lib/utils";

const Wrapper = styled.div`
  .banner-wrapper {
    height: 24rem;
    background: pink;
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    .content-left {
      width: 65%;
    }
    .content-right {
      width: 35%;
      transform: translateX(1rem);

      .top-wrapper {
        .top-title {
          color: var(--main-text-color);
          font-size: 0.9rem;
          width: 15rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px dashed var(--border-color);
        }
        .top-content {
        }
        .love-list {
        }
      }
    }
  }
`;

const LoveLi: any = styled.li`
  overflow: hidden;
  position: relative;
  border-radius: 0.45rem;
  height: 4.5rem;

  &:nth-child(n + 2) {
    margin-top: 0.75rem;
  }
  .li-left {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(27, 29, 30, 0.8);
    background: url(${(props: any) => props.bgImg}) no-repeat right center /  3.66rem;
    padding: 0.9rem;
    box-sizing: border-box;
    z-index: 2;

    p {
      margin: 0;
      width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }


    .li-title {
      font-size: 0.9rem;
      color: var(--main-text-color);
      font-weight: 500;
      text-overflow: ellipsis;
    }
    .li-link {
      font-size: 0.9rem;
      color: var(--second-text-color);

    }
  }
  .li-right {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(${(props: any) => props.bgImg}) no-repeat 50% center / cover;
    filter: blur(10px);
    z-index: 1;
  }
`;

interface IBlogProps {
  articles: IArticle[];
  loveList: IArticle[];
  total: number;
}

const Blog: React.FunctionComponent<IBlogProps> = ({
  articles,
  total,
  loveList,
}) => {
  return (
    <Wrapper>
      <div className="banner-wrapper">
        <p>tech and poems</p>
      </div>

      <div className="content">
        <div className="content-left">
          <ArticleList articles={articles} />
        </div>

        <div className="content-right">
          <div className="top-wrapper">
            <p className="top-title">Top 7 Most Viewed</p>
            <div className="top-content">
              <ul className="love-list">
                {loveList &&
                  loveList.map((love) => (
                    <LoveLi
                      key={love.id}
                      className="love-li"
                      bgImg={love.cover}
                    >
                      <div className="li-left">
                        <p className="li-title">{love.title}</p>
                        <p className="li-link">{love.id}</p>
                      </div>
                      <div className="li-right"></div>
                    </LoveLi>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Blog;
