import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

import IndexBanner from "./index-banner";
import IndexNotice from "./index-notice";
import IndexRecommend from "./index-recommend";
import IndexRepository from "./index-repository";

interface IHomeProps {
  articles: IArticle[];
}

const Home: React.FunctionComponent<IHomeProps> = ({ articles }) => {
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <IndexBanner />

      {/* <IndexNotice /> */}

      <IndexRecommend articles={articles} />

      <IndexRepository />
    </Wrapper>
  );
};

export default Home;