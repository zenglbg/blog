import React, { Component } from "react";
import "./index.less";

import { Divider, Icon, Card } from "antd";

class About extends Component {
  state = { commentList: [] };

  render() {
    return (
      <Card bordered={false}>
        <div className="content-inner-wrapper about">
          <Divider orientation="left">Blog</Divider>
          <p>
            学习Typesciprt，rxjs实践项目，前后端均使用TS编写，并简单的使用rxjs的一些功能。
          </p>
          <p>前端：react + react-router + redux + rxjs + antd </p>
          <p>服务端：koa2 + mysql + typeorm</p>
          <p className="code">
            <a
              href="https://github.com/zenglbg/blog"
              rel="noreferrer noopener"
              target="_blank"
            >
              源码戳这里
            </a>
          </p>

          <Divider orientation="left">Me</Divider>

          <ul className="about-list">
            <li>姓名：Gong Qiang</li>
            <li>
              <Icon type="github" style={{ fontSize: "16px" }} />：
              <a
                target="_blank"
                className="link"
                rel="noreferrer noopener"
                href="https://github.com/zenglbg"
              >
                github
              </a>
            </li>
            <li>
              联系方式：
              <span>204606686</span>
              <Divider type="vertical" />
              <i className="iconfont icon-email" />
              <a href="mailto:zenglbg@gmail.com">zenglbg@gmail.com</a>
            </li>
            <li>坐标：深圳市</li>
            <li>
              学历专业：专科
              <Divider type="vertical" />
              网络工程
            </li>
            <li>
              skill：
              <ul>
                <li>前端：React、Vue、rxjs、Javascript、Typescript、Echats</li>
                <li>服务端：Node、Koa2</li>
                <li>数据库：Mysql</li>
                <li>APP：ReactNative, uni-app</li>
                <li>其他：webpack、git、nginx、docker</li>
              </ul>
            </li>
          </ul>
        </div>
      </Card>
    );
  }
}

export default About;
