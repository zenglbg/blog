import "./index.less";
import React, { Component } from "react";
import { ReactReduxContext, connect } from "react-redux";
import { Icon, List, Card, Timeline } from "antd";
import { Link } from "react-router-dom";
import { Article } from "@actions";
import { IState } from "@reducer";
interface Props {
  getArticleListAll: Function;
}
interface State {}
@(connect(({ article }: IState) => ({ article }), {
  getArticleListAll: Article.instance.getArticleListAll
}) as any)
export default class Archive extends Component<
  Props & Pick<IState, "article">,
  State
> {
  state = {};

  public componentDidMount() {
    this.props.getArticleListAll();
  }
  public shouldComponentUpdate(np, ns) {
    return this.props.article == np.article;
  }
  private itemMap = (items: any) =>
    items.map(item => (
      <Timeline.Item key={item.id}>
        <Link to={`/web/detail/${item.id}`}>
          <span className="mr20">{item.createdAt.slice(0, 10)}</span>
          <span>{item.title}</span>
        </Link>
      </Timeline.Item>
    ));

  private archive = article_list_all => {
    const data = article_list_all.reduce((acc, curr) => {
      const key = curr.createdAt.substring(0, 4);
      acc[key] = acc[key] ? acc[key].concat([curr]) : [curr];
      return acc;
    }, {});
    return Object.keys(data).map(key => (
      <div key={key}>
        <Timeline.Item
          dot={<Icon type="clock-circle-o" />}
          color="red"
          style={{ lineHeight: "20px" }}
        >
          <span style={{ fontSize: "20px" }}>{key}</span>
        </Timeline.Item>
        {this.itemMap(data[key])}
      </div>
    ));
  };
  public render() {
    const { article_list_all } = this.props.article;
    return (
      <Card bordered={false}>
        <Timeline>
          {article_list_all ? this.archive(article_list_all) : null}
        </Timeline>
      </Card>
    );
  }
}
