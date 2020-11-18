import React, { useState, useEffect } from "react";
import Link from "next/link";
import ArticleList from "@common/article-list";
import styled from "styled-components";
import iconTop from "./images/icon-top.png";
import iconTags from "./images/tags.png";
import banner from "./images/banner1.jpg";

const Wrapper = styled.div`
  .banner-wrapper {
    height: 24rem;
    background: url(${banner}) no-repeat center / cover;
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    .content-left {
      width: 65%;
      transform: translateX(-1rem);
    }
    .content-right {
      width: 35%;
      transform: translateX(1rem);

      .top-title,
      .tag-title {
        color: var(--main-text-color);
        font-size: 0.9rem;
        width: 15rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed var(--border-color);
        padding-left: 1.2rem;
        background: no-repeat left 0.2rem / 1rem;
      }
      .top-wrapper {
        .top-title {
          background-image: url(${iconTop});
        }
        .top-content {
        }
        .love-list {
        }
      }

      .tag-wrapper {
        margin-top: 2rem;
        .tag-title {
          background-image: url(${iconTags});
        }

        .tag-content {
          display: flex;
          p {
            height: 1rem;
            line-height: 1rem;
            margin-right: 0.5rem;
            background-color: rgba(0, 150, 94, 0.1);
            padding: 0 0.5rem;
            font-size: 0.7rem;
            color: #ff7743;
          }
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
    background: url(${(props: any) => props.bgImg}) no-repeat right center /
      3.66rem;
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
  tags: ITag[];
  total: number;
}

const Blog: React.FunctionComponent<IBlogProps> = ({
  articles,
  total,
  loveList,
  tags,
}) => {
  // console.log(tags);
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
                    <Link href="/article/id" as={`/article/${love.id}`}>
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
                    </Link>
                  ))}
              </ul>
            </div>
          </div>

          <div className="tag-wrapper">
            <p className="tag-title">Tag Cound</p>

            <div className="tag-content">
              {tags.map((tag) => (
                <p key={tag.id}>{tag.label}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Blog;
