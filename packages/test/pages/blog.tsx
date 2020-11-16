import { NextPage, NextPageContext } from "next";
import BlogPage from "@components/blog";
import { ArticleApi } from "@lib/api";

interface IBlogProps {
  articles: IArticle[];
  loveList: IArticle[]
  total: number;
}
const pageSize = 12;

const Blog: NextPage<IBlogProps> = (props) => {
  return <BlogPage {...props} />;
};

Blog.getInitialProps = async (ctx: NextPageContext) => {
  const [articleList, loveList] = await Promise.all([
    ArticleApi.getArticles({
      page: 1,
      pageSize,
      status: "publish",
    }),
    ArticleApi.getLove()
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
