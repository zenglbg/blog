import "./index.less";
import React, { Component } from "react";
import { Icon, Card } from "antd";
import { connect } from "react-redux";
import { Article } from "@actions";
import { IState } from "@reducer";
import { RouteComponentProps } from "react-router-dom";
interface Props {
  getArticle: Function;
}

import Preview from "../../common/preview";

@(connect(
  ({ article }: IState) => ({
    article
  }),
  {
    getArticle: Article.instance.getArticle
  }
) as any)
export default class Detail extends Component<
  Props & RouteComponentProps & Pick<IState, "article">
> {
  public componentDidMount() {
    this.props.getArticle(this.props.match.params);
  }

  private extra = data => (
    <div className="extra-wrapper">
      <Icon type="calendar" className="calender" />
      {data.createdAt}
      <Icon type="eye" className="eye" />
      {data.readedCount} 次预览
    </div>
  );

  render() {
    const { article_item } = this.props.article;
    return (
      <div className="detail">
        <Card title={article_item.title} extra={this.extra(article_item)}>
          <div className="info-wrapper"></div>
          <Preview markdown={article_item.content} />
        </Card>
      </div>
    );
  }
}
