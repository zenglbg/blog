import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Form, Input, Button, Tag } from "antd";
import Link from "next/link";
import { IState } from "../../../redux/reducer";
import { articleActions, ArticleAction } from "../../../redux/actions";
import AdminLayout from "../../../components/adminLayout";
import { color } from "../../../utils";
const { getArticleList, delArticle } = articleActions;

interface Props {
  form: any;
  getArticleList: (obj: any) => void;
  delArticle: Function;
}
type ArticleState = Pick<IState, "article">;
export type IProps = Props & ArticleState;

export class Article extends Component<IProps> {
  state: {
    loading: boolean;
    title: string;
    pageNo: number;
    pageSize: number;
    columns: Array<any>;
  } = {
    loading: false,
    title: "blog",
    pageNo: 1,
    pageSize: 10,
    columns: [
      {
        title: "序号",
        dataIndex: "id",
        key: "index",
        width: 80,
        align: "center"
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "摘要",
        dataIndex: "summary",
        key: "summary",
        width: 400
      },
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        render: category =>
          category.map((v, index) => (
            <Tag
              key={index}
              color={color[Math.floor(Math.random() * color.length)]}
            >
              {v}
            </Tag>
          ))
      },
      {
        title: "访问次数",
        dataIndex: "readedCount",
        key: "readedCount",
        width: 100
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt"
      },
      {
        title: "更新时间",
        dataIndex: "updatedAt",
        key: "updatedAt"
      },
      {
        title: "操作",
        align: "center",
        width: 180,
        render: record => (
          <span>
            <Button
              ghost
              type="primary"
              className="mr10"
              onClick={() => {
                this.handleEdit(record.id);
              }}
            >
              edit
            </Button>
            <Button
              ghost
              type="danger"
              onClick={() => {
                this.handleDelete(record.id);
              }}
            >
              delete
            </Button>
          </span>
        )
      }
    ]
  };

  private handleEdit = (id: number) => {
    console.log(id);
  };

  private handleDelete = (id: number) => {
    this.props.delArticle({ id });
  };

  public componentDidMount() {
    const { title, pageNo, pageSize } = this.state;
    this.props.getArticleList({
      title,
      pageNo,
      pageSize
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { article_list, list_loading } = this.props.article;
    const { getArticleList } = this.props;
    const { columns, title, pageNo, pageSize } = this.state;
    return (
      <div id="article">
        <AdminLayout>
          <Form layout="inline">
            <Form.Item>
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请输入标题" }]
              })(<Input placeholder="请输入标题" allowClear={true} />)}
            </Form.Item>
            <Form.Item>
              <Button
                className="mr10"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  getArticleList({
                    title,
                    pageNo,
                    pageSize
                  });
                }}
              >
                search {title}
              </Button>
              <Link href="/admin/article-add">
                <Button type="primary">create</Button>
              </Link>
            </Form.Item>
          </Form>
          <Table
            bordered
            className="mt10"
            loading={list_loading}
            columns={columns}
            dataSource={article_list}
            rowKey={(record: any) => record.id}
          />
        </AdminLayout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article
});

const mapDispatchToProps = { getArticleList, delArticle };
const M_article = connect(mapStateToProps, mapDispatchToProps)(Article);
export default Form.create({ name: "horizontal_login" })(M_article);
