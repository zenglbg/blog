import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.header`
  height: 68px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg);
  z-index: 9999;

  &.isFixed {
    position: fixed;
    z-index: 100;
    transform: translateY(-100%);

    &.visible {
      transform: translateY(0);
    }
  }

  &.boxShadow {
    box-shadow: var(--box-shadow);
  }

  nav {
    height: inherit;
    display: flex;
    align-items: center;
    padding: 0 36px;

    .logo {
      width: 220px;
      height: 44px;
      color: var(--main-text-color);
      text-align: left;
      margin-right: 2rem;

      img {
        display: inline-block;
        height: 44px;
      }
    }

    .nav-bar {
      display: flex;
      flex: 1;
      margin-right: 428px;
      a {
        margin-right: 24px;

        span:first-child {
          margin-right: 8px;
        }
      }
    }
  }
`;

interface IHeaderProps {
  setting: any;
  menus: any;
}

const Header: React.FunctionComponent<IHeaderProps> = ({ setting, menus }) => {
  const [affix, setAffix] = useState(false);
  const [affixVisible, setAffixVisible] = useState(false);
  console.log(menus);
  return (
    <Wrapper
      className={`${affix ? "isFixed" : ""} ${affixVisible ? "visible" : ""}`}
    >
      <nav>
        <a href="/" className="logo">
          <img src={setting.systemLogo} alt="" />
        </a>
        <div className="nav-bar">
          {menus.map((menu) => {
            const Icon = menu.icon ? (
              typeof menu.icon === "string" ? (
                <img src="menu.icon" />
              ) : (
                menu.icon
              )
            ) : null;

            return /page/.test(menu.path) ? (
              <Link key={menu.path} href="/page/[id]" as={menu.path}>
                <a>
                  {Icon && <Icon />}
                  <span>{menu.label}</span>
                </a>
              </Link>
            ) : (
              <Link key={menu.path} href={menu.path}>
                <a>
                  {Icon && <Icon />}
                  <span>{menu.label}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </nav>
    </Wrapper>
  );
};

export default Header;
