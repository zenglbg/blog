import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Col } from "antd";
import { Tags, Article } from "@actions";
import { IState } from "@reducer";

interface Props {
  getTagAll: Function;
  getArticleList: Function;
}
interface State {}

import RHeader from "./child/header/index";
import RSlider from "./child/slider/index";
@(connect(
  ({ tag, article }: IState) => ({
    tag,
    article
  }),
  {
    getTagAll: Tags.instance.getTagAll,
    getArticleList: Article.instance.getArticleList
  }
) as any)
export default class WebLayout extends Component<
  Props & Pick<IState, "tag"> & Pick<IState, "article">,
  State
> {
  state = {};
  public componentDidMount() {
    this.props.getTagAll();
  }
  render() {
    const contentHeight = document.body.clientHeight - 64 - 62;
    let { tag_list_all } = this.props.tag;
    let { article_list } = this.props.article;

    return (
      <div>
        <Layout className="wrapper">
          <RHeader {...this.props} />

          <Layout className="wrapper-container">
            <Layout.Content
              style={{
                paddingTop: 24,
                margin: 0,
                minHeight: contentHeight,
                height: "100%",
                overflow: "initial"
              }}
            >
              <Col
                lg={{ span: 16, offset: 1 }}
                md={{ span: 16, offset: 1 }}
                xs={{ span: 24 }}
              >
                {this.props.children}
              </Col>
              <Col
                lg={{ span: 5, offset: 1 }}
                md={{ span: 6, offset: 1 }}
                xs={{ span: 0 }}
              >
                {article_list && tag_list_all ? (
                  <RSlider
                    {...this.props}
                    tag_list_all={tag_list_all}
                    article_list={article_list}
                  />
                ) : null}
              </Col>
            </Layout.Content>
          </Layout>

          <Layout.Footer style={{ textAlign: "center" }}>
            Copyright © Zeng 2020
          </Layout.Footer>
        </Layout>
      </div>
    );
  }
}
