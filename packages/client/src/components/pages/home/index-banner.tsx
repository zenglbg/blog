import * as React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import cls from "classnames";
import style from "./scss/banner.scss";

interface IBannerProps {}

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/font_2154495_13dd5jlmntfr.js"],
});

const Banner: React.FunctionComponent<IBannerProps> = (props) => {
  return (
    <div className={style.banner_wrapper}>
      <h2 className={style.hello_wrapper}>
        <p className={cls(style.hello_text, style.one)}>hello</p>
        <p className={cls(style.hello_text, style.two)}>Mr.Circle!</p>
      </h2>

      <div className={style.motto_wrapper}>
        <p className={style.motto_text}>
          能让人快乐的是精神状态，能让人安全的是物质基础，所以要一直努力，让自己更加强大。 
        </p>

        <p className={style.motto_links}>
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
    </div>
  );
};

export default Banner;
