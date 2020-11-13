import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 68px;
  nav {
    height: inherit;
    display: flex;
    align-items: center;
    padding: 0 36px;

    .logo {
      width: 220px;
      height: 44px;
      background-color: pink;
    }
  }
`;

interface IHeaderProps {
  setting: any;
  menus: any;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [affix, setAffix] = useState(false);
  const [affixVisible, setAffixVisible] = useState(false);

  return (
    <Wrapper>
      <nav>
        <a href="/" className="logo"></a>
        <div className="nav-bar">
          <a href="/">首页</a>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Header;
