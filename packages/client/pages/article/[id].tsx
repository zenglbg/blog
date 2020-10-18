import React, { useRef } from "react";

import * as dayjs from "dayjs";
import { NextPage } from "next";
import Link from "next/link";
import { Helmet } from "react-helmet";
import cls from "classnames";
import { Modal, Form, Input } from "antd";
import { TagOutlined } from "@ant-design/icons";

import { ArticleApi } from "@/services";
import style from "./index.module.scss";

interface IArticleProps {
  article: IArticle;
}

const Article: NextPage<IArticleProps> = ({ article }) => {
  const ref = useRef(null);
  const content = useRef(null);

  return (
    <div>
      <Modal visible={false} title="文章收保护，请输入访问密码">
        <Form.Item>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      </Modal>

      <div>
        <Helmet>
          <title>{article.title}</title>
        </Helmet>

        <article className={cls("container", style.container)}>
          <meta itemProp="headline" content={article.title} />

          {article.tags && (
            <meta
              itemProp="keywords"
              content={article.tags.map((tag) => tag.label).join(" ")}
            />
          )}

          <meta itemProp="dataPublished" content={article.publishAt} />
          {article.cover && <meta itemProp="image" content={article.cover} />}

          <div className={style.meta}>
            {article.cover && (
              <div className={style.coverWrapper}>
                <img src={article.cover} alt="文章封面" />
              </div>
            )}

            <h1 className={style.title}>{article.title}</h1>

            <p className={style.desc}>
              <span>
                发布于
                {dayjs.default(article.publishAt).format(`YYYY-MM-DD hh:mm:ss`)}
              </span>
              <span> • </span>
              <span>阅读量 {article.views}</span>
            </p>
          </div>
          <div className={style.contentWrapper} ref={content}>
            <div className={style.content}>
              <div
                ref={ref}
                className={cls("markdown", style.markdown)}
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>

              <div className={style.articleFooter}>
                <div className={style.articleInfo}>
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
                  <div className={style.tags}>
                    {article.tags.map((tag) => {
                      return (
                        <div className={style.tag} key={tag.id}>
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
    </div>
  );
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const article = await ArticleApi.getArticle(id);
  return { article };
};

export default Article;
