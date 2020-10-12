import React, { useRef, useEffect, useState, useCallback } from "react";
import { NextPage } from "next";
import cls from "classnames";
import { Pagination, Space } from "antd";
import { ArticleApi } from "@/services/index";
import { ArticleList } from "@components/ArticleList";
import { RecommendArticle } from "@components/RecommendArticles";
import Category from "@components/Category";
import Tag from "@components/Tag";

import { scroll } from "@/providers";

import style from "./index.module.scss";

const pageSize = 5;

interface IHomeProps {
  articles: IArticle[];
  total: number;
  [key: string]: any;
}

const Home: NextPage<IHomeProps> = ({
  articles: defaultArticles = [],
  total,
  categories = [],
  tags = [],
}) => {
  const [affix, setAffix] = useState(false);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>(defaultArticles);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setAffix(y > 100);
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, []);

  const getArticles = useCallback((page) => {
    ArticleApi.getArticles({
      page,
      pageSize,
      status: "publish",
    }).then((res) => {
      setPage(page);
      setArticles((articles) => res["data"]);
      // setArticles((articles) =>
      //   articles.reduce((acc, item) => {
      //     if (acc.some((v) => v.id !== item.id)) {
      //       acc.push(item);
      //     }
      //     return acc;
      //   }, res["data"])
      // );
    });
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={cls("container", style.container)}>
        <div className={style.content}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <ArticleList articles={articles} />

            <Pagination
              defaultCurrent={1}
              total={total}
              pageSize={pageSize}
              onChange={(page) => getArticles(page)}
            />
          </Space>

          <aside className={cls(style.aside)}>
            <div>
              <div
                style={{
                  transform: `translateY(${affix ? "-100%" : 0})`,
                }}
              >
                <RecommendArticle />
              </div>
              <div className={cls(affix ? style.isFixed : false)}>
                <Category categories={categories} />

                <Tag tags={tags} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// 服务端预取数据
Home.getInitialProps = async () => {
  const [articles] = await Promise.all([
    ArticleApi.getArticles({ page: 1, pageSize, status: "publish" }),
  ]);
  return {
    articles: articles["data"],
    total: articles["total"],
    needLayoutFooter: false,
  };
};

export default Home;
