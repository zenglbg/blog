import { NextPage } from "next";

import { ArticleApi } from "@lib/api";
import ArticlePage from "@components/article";
interface IArticleProps {
  article: IArticle;
}

const Article: NextPage<IArticleProps> = (props) => {
  return <ArticlePage {...props} />;
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const article = await ArticleApi.getArticle(id);
  return { article };
};

export default Article;
