import React, { useRef, useEffect, useState, useCallback } from "react";
import { NextPage } from "next";
import InfiniteScroll from "react-infinite-scroller";
import cls from "classnames";
import { Pagination, Form } from "antd";
import style from "./index.module.scss";
import { ArticleProvider } from "@providers/index";
import { ArticleList } from "@components/ArticleList";

const pageSize = 12;
interface IHomeProps {
  articles: IArticle[];
  total: number;
}

const Home: NextPage<IHomeProps> = ({
  articles: defaultArticles = [],
  total,
}) => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>(defaultArticles);
  useEffect(() => {
    getArticles(page);
    return () => {
      // cleanup
    };
  }, []);

  const getArticles = useCallback((page) => {
    ArticleProvider.getArticles({
      page,
      pageSize,
      status: "publish",
    }).then((res) => {
      console.log(res);
      setPage(page);
      setArticles((articles) => [...articles, ...res["data"]]);
    });
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={cls("container", style.container)}>
        <div className={style.content}>
          {/* <InfiniteScroll
            pageStart={1}
            loadMore={getArticles}
            hasMore={page * pageSize < total}
            loader={
              <div className={style.loading} key={0}>
                正在获取文章...
              </div>
            }
          >
            <ArticleList articles={articles} />
          </InfiniteScroll> */}
          <div className="articlelist">
            <Form>
              <Form.Item>
                <div>32323112</div>
              </Form.Item>
              <Form.Item>
                <div>32nodejs3232</div>
              </Form.Item>
              <Form.Item>
                <div>32323ss2</div>
              </Form.Item>
            </Form>

            <Pagination defaultCurrent={1} total={total + 100} />
          </div>

          <aside className={cls(style.aside)}>
            <div>
              <div>
                <h1>推荐文章</h1>
              </div>
              <div className={cls(style.isFixed)}>
                <h1>内容</h1>
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
    ArticleProvider.getArticles({ page: 1, pageSize, status: "publish" }),
  ]);
  return {
    articles: articles["data"],
    total: articles["total"],
    needLayoutFooter: false,
  };
};

export default Home;
