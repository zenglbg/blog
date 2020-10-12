import { useState, useEffect } from "react";
import { ArticleApi } from "@/services";

export const withNameOverride = (BaseComponent) => (props) => (
  <BaseComponent {...props} name="New Name" />
);

export const withRecommend = (BaseComponent) => (props) => {
  const { articleId } = props;
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    ArticleApi.getRecommend(articleId).then((res) => {
      if (res && res["success"]) {
        setArticles(res);
      }
    });
  }, [articleId]);

  return <BaseComponent {...props} articles={articles} />;
};


