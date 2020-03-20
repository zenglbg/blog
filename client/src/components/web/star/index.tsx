import "./index.less";
import React, { Component } from "react";
import { ReactReduxContext, connect } from "react-redux";
import { Icon, List, Card, Timeline, Divider } from "antd";
import { Link } from "react-router-dom";
import { Star } from "@actions";
import { IState } from "@reducer";
import { a } from "src/routes/Guard";
interface Props {
  getStar: Function;
}
interface State {}
@(connect(({ star }: IState) => ({ star }), {
  getStar: Star.instance.getStar
}) as any)
export default class Archive extends Component<
  Props & Pick<IState, "star">,
  State
> {
  state = {
    total: null,
    pageNo: 1
  };
  private pageSize = 10;
  private pagination = {
    pageSize: this.pageSize,
    size: "small",
    current: this.state.pageNo,
    total: this.state.total
  };

  public componentDidMount() {
    this.getList();
  }
  public shouldComponentUpdate(np, ns) {
    return this.props.star == np.star;
  }
  private getList = () => {
    this.props.getStar({
      title: "",
      pageNo: this.state.pageNo,
      pageSize: this.pageSize
    });
  };

  public render() {
    const { star_list } = this.props.star;
    return star_list ? (
      <List
        className="star-list"
        header={<div className="star-title">文章收藏</div>}
        itemLayout="vertical"
        pagination={star_list ? this.pagination : null}
        dataSource={star_list}
        renderItem={item => (
          <List.Item key={item.id} extra={item.date}>
            <List.Item.Meta
              description={[
                <a key={item.url} href={item.url} target="_blank">
                  {item.title}
                </a>
              ]}
            />
          </List.Item>
        )}
      />
    ) : null;
  }
}
