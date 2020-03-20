import "./index.less";
import React, { Component } from "react";
import { List, Icon, Tag } from "antd";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Article } from "@actions";
import { IState } from "@reducer";
import { color } from "@utils";

interface Props {
  getArticleList: Function;
}
interface State {}
@(connect(
  ({ tag, article }: IState) => ({
    tag,
    article
  }),
  {
    getArticleList: Article.instance.getArticleList
  }
) as any)
export default class home extends Component<
  Props & Pick<IState, "tag"> & Pick<IState, "article"> & RouteComponentProps,
  State
> {
  state = { pageNo: 1, pageSize: 5 };

  public componentDidMount() {}

  private IconText = (type, text) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  private pagination = {
    current: this.state.pageNo,
    pageSize: this.state.pageSize,
    total: this.props.article.article_list.length,
    size: "small",
    onChange: async page => {
      await this.setState({ pageNo: page });
      this.props.getArticleList({
        title: "",
        pageNo: page,
        pageSize: this.state.pageSize
      });
    }
  };

  public render() {
    let { article_list } = this.props.article;
    return (
      <div className="list-wrapper">
        <List
          size="large"
          pagination={article_list.length ? this.pagination : null}
          dataSource={article_list}
          renderItem={(item: any, index) => (
            <List.Item
              key={item.id}
              onClick={() => this.props.history.push(`/web/detail/${item.id}`)}
              actions={[
                item.tag
                  ? this.IconText(
                      "tags",
                      item.tag.map(v => (
                        <Tag
                          key={item + Math.random()}
                          color={
                            color[Math.floor(Math.random() * color.length)]
                          }
                        >
                          {v}
                        </Tag>
                      ))
                    )
                  : null,
                item.category
                  ? this.IconText(
                      "folder",
                      item.category.map(v => (
                        <Tag
                          key={item + Math.random()}
                          color={
                            color[Math.floor(Math.random() * color.length)]
                          }
                        >
                          {v}
                        </Tag>
                      ))
                    )
                  : null,
                this.IconText("calendar", item.createdAt),
                this.IconText("eye", `${item.readedCount}次预览`)
              ]}
            >
              <List.Item.Meta title={item.title} description={item.summary} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
