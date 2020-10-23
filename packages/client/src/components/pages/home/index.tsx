import React from "react";
// import style from "./index.module.scss";
import './index.module.scss'
import IndexBanner from "./index-banner";
import IndexRepository from './index-repository'

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div className="index_home_wrapper_quan">
      <IndexBanner />

      <IndexRepository />
    </div>
  );
};

export default Home;
