import * as React from "react";
import styled, { ThemeProvider } from "styled-components";

import { createFromIconfontCN } from "@ant-design/icons";

interface IBannerProps {}

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/font_2154495_13dd5jlmntfr.js"],
});
const theme = {
  colors: {
    primary: "pink",
    bannerImg: require("./images/banner6.jpg"),
  },
};

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  /* background: url(./images/home/banner6.jpg) no-repeat center / contain; */
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url(${({ theme }) => theme.colors.bannerImg});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .hello-wrapper {
    filter: contrast(10);
    overflow: hidden;
    height: 150px;
  }

  .hello-text {
    color: white;
    font-size: 100px;
    line-height: 100px;
    font-family: sans-serif;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    animation: show-hide 8s infinite ease-in-out;
    filter: opacity(0);
  }

  .hello-text.one {
    transform: translateY(50%);
    animation-direction: normal;
  }
  .hello-text.two {
    transform: translateY(-50%);
    animation-direction: reverse;
    animation-delay: -1s;
  }

  .motto-wrapper {
    position: relative;
    background: rgba(0, 0, 0, 0.7);
    padding: 15px 30px;
    border-radius: 10px;
    > p {
      margin-bottom: 0;
    }

    .motto-text {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      letter-spacing: 5px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .motto-links {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  @keyframes show-hide {
    0% {
      filter: opacity(0) blur(0.08em);
      letter-spacing: -0.8em;
    }

    25% {
      filter: opacity(1) blur(0.08em);
    }

    40% {
      filter: opacity(1) blur(0.24em);
    }

    40% {
      filter: opacity(0) blur(0.24em);
      letter-spacing: 0.34em;
    }
  }
`;

const Banner: React.FunctionComponent<IBannerProps> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Section>
        <h2 className="hello-wrapper">
          <p className="hello-text one">hello</p>
          <p className="hello-text two">Mr.Circle!</p>
        </h2>

        <div className="motto-wrapper">
          <p className="motto-text">
            能让人快乐的是精神状态，能让人安全的是物质基础，所以要一直努力，让自己更加强大。 
          </p>

          <p className="motto-links">
            <a href="">
              <IconFont type="icon-github" />
            </a>
            <a href="">
              <IconFont type="icon-paypal" />
            </a>
            <a href="">
              <IconFont type="icon-wechat" />
            </a>
            <a href="">
              <IconFont type="icon-instagram" />
            </a>
            <a href="mailto:zenglbg@gmail.com">
              <IconFont type="icon-emailFilled" />
            </a>
            <a href="">
              <IconFont type="icon-youtube" />
            </a>
            <a href="">
              <IconFont type="icon-alipay" />
            </a>
            <a href="">
              <IconFont type="icon-soundcloud" />
            </a>
            <a href="">
              <IconFont type="icon-telegram" />
            </a>
          </p>
        </div>
      </Section>
    </ThemeProvider>
  );
};

export default Banner;
