import * as React from "react";
import { useState, useEffect } from "react";
import { FileFilled, FileOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { ArticleApi } from "@/services";
import { ArticleList } from "@components/ArticleList";
import { compose, withRecommend, withNameOverride } from "@/providers";
import { format } from "timeago.js";

import Link from "next/link";
import style from "./index.module.scss";

interface IRecommendArticleProps {
  mode?: "inline" | "vertical";
  needTitle?: boolean;
  articles?: IArticle[];
  asCard?: boolean;
}

 
const Index: React.FunctionComponent<IRecommendArticleProps> = ({
  mode = "vertical",
  needTitle = true,
  asCard = false,
  articles,
}) => {
  return (
    <div className={style.wrapper}>
      {needTitle && (
        <div className={style.title}>
          <FileOutlined />
          <span>推荐</span>
        </div>
      )}
      {mode === "inline" ? (
        <ul>
          {(articles || []).map((article) => {
            return (
              <li key={article.id}>
                <div>
                  <Link href={`/article/[id]`} as={`/article/${article.id}`}>
                    <a>
                      <Space direction="vertical">
                        <span>{article.title}</span>
                        <span>{format(article.publishAt, "zh_CN")}</span>
                      </Space>
                    </a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ArticleList articles={articles || []} asCard={asCard} />
      )}
    </div>
  );
};

export const RecommendArticle = compose<IRecommendArticleProps, any>(withRecommend, withNameOverride)(Index);
