import { NextPage, NextPageContext } from "next";
import BlogPage from "@components/blog";
import { ArticleApi } from "@lib/api";

interface IBlogProps {}
const pageSize = 12;

const Blog: NextPage<IBlogProps> = (props) => {
  return <BlogPage {...props} />;
};

Blog.getInitialProps = async (ctx: NextPageContext) => {
  const { data, total } = await ArticleApi.getArticles({
    page: 1,
    pageSize,
    status: "publish",
  });

  return {
    articles: data,
    total,
    needLayoutFooter: false,
  };
};
export default Blog;
