import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Col } from "antd";
import { Tags } from "@actions";
import { IState } from "@reducer";

interface Props {}
interface State {}

import RHeader from "./child/header/index";
import RSlider from "./child/slider/index";
@(connect(
  ({ tag }: IState) => ({
    tag
  }),
  {
    getTagAll: Tags.instance.getTagAll
  }
) as any)
export default class WebLayout extends Component<Props, State> {
  state = {};

  render() {
    const contentHeight = document.body.clientHeight - 64 - 62;

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
                <RSlider {...this.props} />
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
