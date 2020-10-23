import * as React from "react";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import HomePage from "@components/pages/home";

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
      <HomePage />
    </>
  );
};

Home.getInitialProps = (ctx: NextPageContext) => {
  return {};
};

export default Home;
