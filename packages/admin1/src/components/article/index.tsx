import React, { useState, useCallback, memo, useEffect, Dispatch } from "react";
import * as dayjs from "dayjs";
import { Popconfirm, Badge, message, Divider, Tag } from "antd";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { of } from "rxjs";

import SPTDataTable from "../../common/SPTDataTable";
import { ActionArticle } from "@actions";
import { IState } from "@reducer";
import { ArticleApi, CategoryApi, TagApi } from "@api";

interface IArticleProps {}

const columns = [
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const isDraft = status === "draft";
      return (
        <Badge
          color={isDraft ? "gold" : "green"}
          text={isDraft ? "草稿" : "已发布"}
        />
      );
    },
  },
  {
    title: "分类",
    key: "category",
    dataIndex: "category",
    render: (category) =>
      category ? (
        <span>
          <Tag color={"magenta"} key={category.value}>
            {category.label}
          </Tag>
        </span>
      ) : null,
  },
  {
    title: "标签",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <span>
        {Array.isArray(tags)
          ? tags.map((tag) => {
              let color = tag.label.length > 2 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag.label}>
                  {tag.label}
                </Tag>
              );
            })
          : null}
      </span>
    ),
  },
  {
    title: "阅读量",
    dataIndex: "views",
    key: "views",
    render: (views) => (
      <Badge
        count={views}
        showZero={true}
        overflowCount={Infinity}
        style={{ backgroundColor: "#52c41a" }}
      />
    ),
  },
  {
    title: "发布时间",
    dataIndex: "publishAt",
    key: "publishAt",
    render: (date) => dayjs.default(date).format("YYYY-MM-DD HH:mm:ss"),
  },
];

const Article: React.FunctionComponent<
  IArticleProps & DispatchProp & Pick<IState, "article"> & RouteComponentProps
> = ({ dispatch, article, history }) => {
  useEffect(() => {
    CategoryApi.getCategorys();
    TagApi.getTags();
  }, []);

  const getArticles = useCallback((params = {}) => {
    dispatch(ActionArticle.getArticles(params));
  }, []);

  const deleteArticle = useCallback((id) => {
    return ArticleApi.deleteArticle(id).then((_) => {
      message.success("文章删除成功");
      getArticles(article.params);
    });
  }, []);

  const handleArticle = (id) => {
    dispatch(ActionArticle.handleId(id));
  };

  const titleColumn = {
    title: "标题",
    dataIndex: "title",
    key: "title",
    render: (text, record) => <a href="">{text}</a>,
  };

  const actionColumn = {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <span>
        <Link
          to="/editor/article"
          target="__blank"
          onClick={() => handleArticle(record.id)}
        >
          编辑
        </Link>
        <Divider type="vertical" />
        <span></span>
        <a onClick={() => {}}>
          <span>查看访问</span>
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="确认删除这个文章"
          onConfirm={() => deleteArticle(record.id)}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  };

  return (
    <div className="article-page">
      <SPTDataTable
        data={article.articles}
        columns={[titleColumn, ...columns, actionColumn]}
        total={article.total}
        onSearch={getArticles}
      />
    </div>
  );
};

export default connect(({ article }: IState) => ({ article }))(Article);
