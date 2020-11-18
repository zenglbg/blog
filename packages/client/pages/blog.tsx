import { NextPage, NextPageContext } from "next";
import BlogPage from "@components/blog";
import { ArticleApi } from "@lib/api";

interface IBlogProps {
  articles: IArticle[];
  loveList: IArticle[];
  total: number;
}

const Blog: NextPage<IBlogProps> = (props) => {
  return <BlogPage {...props} />;
};

Blog.getInitialProps = async (ctx: NextPageContext) => {
  const { tag, category, page = 1, pageSize = 12 } = ctx.query;
  const queryParams = {
    page,
    pageSize,
    status: "publish",
  };
  const [articleList, loveList] = await Promise.all([
    tag
      ? ArticleApi.getArticlesByTag(tag, queryParams)
      : category
      ? ArticleApi.getArticlesByCategory(category, queryParams)
      : ArticleApi.getArticles(queryParams),
    ArticleApi.getLove(),
  ]);
  const { data, total } = articleList;

  return {
    articles: data,
    total,
    loveList,
    needLayoutFooter: false,
  };
};
export default Blog;
