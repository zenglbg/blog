import "./index.less";
import React, { Component } from "react";
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

  render() {
    const { article_item } = this.props.article;
    return (
      <div className="detail">
        <div className="title">
          <h1>{article_item.title}</h1>
        </div>
        <Preview markdown={article_item.content} />
      </div>
    );
  }
}
