import Head from "next/head";
import { NextPage, NextPageContext } from "next";
import HomePage from "@components/home";
import { ArticleApi } from "@lib/api";

interface IHomeProps {
  articles: IArticle[];
}
const Home: NextPage<IHomeProps> = (props) => {
  return (
    <>
      <Head>
        <link
          href="//at.alicdn.com/t/font_2154495_ub16lgra2bf.css"
          rel="stylesheet"
        />
      </Head>
      <HomePage {...props} />
    </>
  );
};
Home.getInitialProps = async (ctx: NextPageContext) => {
  const articles = await ArticleApi.getRecommend();

  return {
    articles,
  };
};
export default Home;
