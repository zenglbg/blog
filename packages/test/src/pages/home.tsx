import Head from "next/head";
import { NextPage, NextPageContext } from "next";
import HomePage from "@components/home";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  return (
    <>
      <Head>
        <link
          href="//at.alicdn.com/t/font_2154495_ub16lgra2bf.css"
          rel="stylesheet"
        />
      </Head>
      <HomePage />
    </>
  );
};
Home.getInitialProps = (ctx: NextPageContext) => {
  return {
    text: 1
  };
};
export default Home;
