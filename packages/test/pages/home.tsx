import Head from "next/head";
import { NextPage, NextPageContext } from "next";
import HomePage from "@components/home";

interface IHomeProps {}

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
Home.getInitialProps = (ctx: NextPageContext) => {
  return {
    a: 1
  }
};
export default Home;
