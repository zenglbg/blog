import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImgCat from "./images/cat.png";

const Wrapper = styled.div`
  position: fixed;
  top: -60rem;
  right: 4rem;
  width: 4.67rem;
  height: 60rem;
  background: url(${ImgCat}) 0px 0px no-repeat;
  cursor: pointer;
  transition: all 600ms cubic-bezier(0.25, 0.1, 0.3, 1.5) 0s;
  animation: 2000ms linear 0s infinite normal none running catdown;
  &.show {
    top: -10rem;
  }
  @keyframes catdown {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

interface ICatProps {
  className: string;
}

const Cat: React.FunctionComponent<ICatProps> = ({ className }) => {
  return (
    <Wrapper
      className={className}
      onClick={() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
    ></Wrapper>
  );
};

export default Cat;
