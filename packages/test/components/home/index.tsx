import React, { useState, useEffect } from "react";
import styled from "styled-components";

import IndexBanner from "./index-banner";
import IndexNotice from "./index-notice";
import IndexRecommend from './index-recommend'
import IndexRepository from "./index-repository";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <Wrapper>
      <IndexBanner />

      {/* <IndexNotice /> */}

      <IndexRecommend />

      
      <IndexRepository />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default Home;
