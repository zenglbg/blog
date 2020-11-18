import React, { useState, useEffect } from "react";
import Link from "next/link";
import ArticleList from "@common/article-list";
import styled from "styled-components";
import { Pagination } from "antd";
import iconTop from "./images/icon-top.png";
import iconTags from "./images/tags.png";
import iconCategorys from "./images/category.png";
import banner from "./images/banner1.jpg";
import _ from "lodash";

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
      .category-title,
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

      .tag-wrapper,
      .category-wrapper {
        margin-top: 2rem;
        .category-title {
          background-image: url(${iconCategorys});
        }
        .tag-title {
          background-image: url(${iconTags});
        }

        .category-content,
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
const CPagination = styled(Pagination)`
  transform: translateX(2rem);
  padding-bottom: 1rem;

  .ant-pagination-prev,
  .ant-pagination-next {
    button {
      border-radius: 50%;
      padding: 0;
    }
  }
  .ant-pagination-item {
    border-radius: 50%;
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
  total: number;
  page: number;
}

const Blog: React.FunctionComponent<IBlogProps> = (props) => {
  const { articles, total, loveList, tags, categories, page } = props as any;
   
  return (
    <Wrapper>
      <div className="banner-wrapper">
        <p>tech and poems</p>
      </div>

      <div className="content">
        <div className="content-left">
          <ArticleList articles={articles} />

          <CPagination
            hideOnSinglePage={true}
            defaultCurrent={Number(page)}
            total={total}
            pageSize={12}
            onChange={(curr, size) => {
              const search = location.search;
              if (search) {
                window.location.href = `${
                  window.location.pathname
                }${location.search.replace(
                  /page=.*&pageSize=.*$/,
                  `page=${curr}&pageSize=${size}`
                )}`;
              } else {
                window.location.href = `${window.location.pathname}?page=${curr}&pageSize=${size}`;
              }
            }}
          />
        </div>

        <div className="content-right">
          <div className="top-wrapper">
            <p className="top-title">Top 7 Most Viewed</p>
            <div className="top-content">
              <ul className="love-list">
                {loveList &&
                  loveList.map((love) => (
                    <Link
                      key={love.id}
                      href="/article/id"
                      as={`/article/${love.id}`}
                    >
                      <LoveLi className="love-li" bgImg={love.cover}>
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
                <Link key={tag.id} href={`/blog?tag=${tag.value}`}>
                  <p>{tag.label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="category-wrapper">
            <p className="category-title">Category Cound</p>

            <div className="category-content">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.value}`}
                >
                  <p>{category.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Blog;
