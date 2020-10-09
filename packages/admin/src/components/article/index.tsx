import React, { useState, useCallback, memo, useEffect, Dispatch } from "react";
import * as dayjs from "dayjs";
import { Popconfirm, Badge, message, Divider, Tag } from "antd";
import { connect, DispatchProp } from "react-redux";
import { of } from "rxjs";

import { Articlesr, Categorysr, Tagssr } from "@providers/index";
import { IState } from "@reducer/index";
import SPTDataTable from "../../common/SPTDataTable";
import { AndroidOutlined } from "@ant-design/icons";
import { ActionArticle } from "@actions/index";

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
  IArticleProps & DispatchProp & Pick<IState, "article">
> = ({ dispatch, article }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(null);
  const [total, setTotal] = useState(0);

  console.log(article);
  useEffect(() => {
    Categorysr.getCategorys();
    Tagssr.getTags();
    return () => {
      // cleanup
    };
  }, []);

  const getArticles = useCallback((params = {}) => {
    dispatch({ type: ActionArticle.getArticles(params) });
    return of(123);
    // return Articlesr.getArticles(params).pipe(
    //   map((res) => {
    //     console.log(res);
    //     if (res && res.success) {
    //       setParams(params);
    //       setTotal(res.data.total);
    //       setArticles(res.data.data);
    //     }
    //     return res;
    //   })
    // );
  }, []);

  const deleteArticle = useCallback(
    (id) => {
      return Articlesr.deleteArticle(id).subscribe((_) => {
        message.success("文章删除成功");
        getArticles(params);
      });
    },
    [params]
  );

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
        <a>编辑</a>
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
        data={articles}
        columns={[titleColumn, ...columns, actionColumn]}
        total={total}
        onSearch={getArticles}
      />
    </div>
  );
};

export default connect(({ article }: IState) => ({ article }))(Article);
