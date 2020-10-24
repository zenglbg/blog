import React from "react";
import "./scss/index.scss";
import IndexBanner from "./index-banner";
import IndexNotice from "./index-notice";
import IndexRepository from "./index-repository";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div className="index_home_wrapper_quan">
      <IndexBanner />

      <IndexNotice />

      <IndexRepository />
    </div>
  );
};

export default Home;
