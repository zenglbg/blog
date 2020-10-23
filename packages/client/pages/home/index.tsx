import * as React from "react";
import { NextPage, NextPageContext } from "next";
import style from "./index.module.scss";
import IndexBanner from "./index-banner";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = (props) => {
  return (
    <div className={style.indexWrapper}>
      <IndexBanner />
    </div>
  );
};

Home.getInitialProps = (ctx: NextPageContext) => {
  return {};
};

export default Home;
