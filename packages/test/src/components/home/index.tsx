import React, { useState } from "react";
import styled from "styled-components";

import IndexBanner from './index-banner'


interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <Wrapper>
      <IndexBanner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  
`;
export default Home;
