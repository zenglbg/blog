import React, { useRef } from "react";
import Link from "next/link";
import * as dayjs from "dayjs";
import { NextPage } from "next";
import { Helmet } from "react-helmet";

import { Modal, Form, Input } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { ArticleApi } from "@lib/api";
import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    margin-top: 40px;
  }

  .meta {
    text-align: center;

    .title {
      margin: 0.67em 0 0;
      font-size: 2.5rem;
      line-height: 1rem;
      font-weight: 700;
      line-height: 1.5;
      color: var(--main-text-color);
      text-align: center;
    }

    .desc {
      font-style: italic;
      color: var(--second-text-color);
      margin-bottom: 1.2em;
      text-align: center;
    }

    .coverWrapper {
      width: 100%;
      max-width: 768px;
      margin: 0 auto;

      img {
        display: inline-block;
        width: 100%;
        height: auto;
      }
    }
  }

  .contentWrapper {
    position: relative;

    .content {
      background: var(--bg);
      max-width: 800px;
      margin: 0 auto;
      padding: 0 16px;

      .articleFooter {
        margin-top: 30px;
        border-top: 1px dashed var(--border-color);
        padding: 21px 0;
        color: var(--second-text-color);
        line-height: 28px;

        .articleInfo {
          blockquote {
            display: block;
            width: 100%;
            font-size: 14px;
            color: var(--disable-text-color);
            border: 1px solid var(--border-color);
            border-left: 4px solid var(--disable-text-color);
            padding: 12px 24px 12px 12px;
            background-color: var(--bg-second);
            position: relative;

            p {
              margin: 0;
            }
          }
        }

        .tags {
          width: 100%;
          display: flex;
          // justify-content: center;

          .tag {
            display: inline-flex;
            align-items: center;
            color: var(--second-text-color);
            background-color: var(--bg-second);
            border: 1px solid var(--border-color);
            padding: 0 8px;
            border-radius: 2px;
            font-size: 14px;
            text-decoration: none;

            &:hover {
              color: #fff;
              background-color: var(--primary-color);
            }

            & + .tag {
              margin-left: 0.8rem;
            }

            span {
              margin-left: 8px;
            }
          }
        }
      }
    }

    .markdown {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 48px;
        padding-left: 13px;
        position: relative;

        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          border-left: 5px solid #ff0000;
          border-width: 5px;
          height: 23px;
        }
      }
    }

    .widget {
      background: #ffffff;
      border: 1px solid var(--border-color);
      padding: 21px 30px;
      margin-bottom: 24px;
    }

    .anchorWidget {
      position: absolute;
      right: 0;
      top: 0;
      max-width: 150px;
      font-size: 1.167rem;
      color: #000;
    }

    @media (max-width: 768px) {
      .content {
        padding: 0;
      }
    }

    @media (max-width: 1196px) {
      .anchorWidget,
      .widget {
        display: none;
      }
    }
  }
`;
interface IArticleProps {
  article: IArticle;
}

const Article: NextPage<IArticleProps> = ({ article }) => {
  const ref = useRef(null);
  const content = useRef(null);

  return (
    <Wrapper>
      <Modal visible={false} title="文章收保护，请输入访问密码">
        <Form.Item>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      </Modal>

      <div>
        <Helmet>
          <title>{article.title}</title>
        </Helmet>

        <article className="container">
          <meta itemProp="headline" content={article.title} />

          {article.tags && (
            <meta
              itemProp="keywords"
              content={article.tags.map((tag) => tag.label).join(" ")}
            />
          )}

          <meta itemProp="dataPublished" content={article.publishAt} />
          {article.cover && <meta itemProp="image" content={article.cover} />}

          <div className="meta">
            {article.cover && (
              <div className="coverWrapper">
                <img src={article.cover} alt="文章封面" />
              </div>
            )}

            <h1 className="title">{article.title}</h1>

            <p className="desc">
              <span>
                发布于
                {dayjs.default(article.publishAt).format(`YYYY-MM-DD hh:mm:ss`)}
              </span>
              <span> • </span>
              <span>阅读量 {article.views}</span>
            </p>
          </div>
          <div className="contentWrapper" ref={content}>
            <div className="content">
              <div
                ref={ref}
                className="markdown"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>

              <div className="articleFooter">
                <div className="articleInfo">
                  <blockquote>
                    <p>
                      发布时间：
                      {dayjs
                        .default(article.publishAt)
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                    <p>
                      版权信息：
                      <a
                        href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
                        target="_blank"
                      >
                        非商用-署名-自由转载
                      </a>
                    </p>
                  </blockquote>
                </div>

                {article.tags && article.tags.length ? (
                  <div className="tags">
                    {article.tags.map((tag) => {
                      return (
                        <div className="tag" key={tag.id}>
                          <Link href={"/tag/[tag]"} as={"/tag/" + tag.value}>
                            <a>
                              <TagOutlined />
                              <span>{tag.label}</span>
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </div>
    </Wrapper>
  );
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const article = await ArticleApi.getArticle(id);
  return { article };
};

export default Article;
