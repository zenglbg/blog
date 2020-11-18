import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  background: var(--bg-footer);
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid var(--border-color);
  color: #c1bdbd;

  ul.icons {
    display: inline-flex;
    flex-wrap: nowrap;
    margin: 8px 0 16px;

    li {
      font-size: 24px;
      text-align: center;
      display: inline-block;
      border-radius: 50%;
      margin: 0 5px;

      &:first-of-type {
        margin-top: 1px;
      }

      &:hover {
        color: var(--main-text-color);
      }
    }
  }

  .copyright {
    font-size: 10px;
    line-height: 15px;
  }
`;

const Footer = ({ setting, className = "" }) => {
  return (
    <Wrapper className={className}>
      {setting && setting.systemFooterInfo && (
        <div
          className="copyright"
          dangerouslySetInnerHTML={{
            __html: setting.systemFooterInfo,
          }}
        ></div>
      )}
    </Wrapper>
  );
};

export default Footer;
