import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Table, Form, Input, Button, Tag } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { color } from "../../../utils";
import { IState } from "@reducer";
import { Article } from "@actions";

import AdminLayout from "../../common/adminLayout";
interface Props {
  getArticleListAll: Function;
  getArticleList: (obj: any) => void;
  delArticle: Function;
  getArticleStatus: Function;
}
type ArticleState = Pick<IState, "article">;
export type IProps = Props &
  ArticleState &
  FormComponentProps &
  RouteComponentProps;

export class Article_doc extends Component<IProps> {
  state: {
    loading: boolean;
    title: string;
    pageNo: number;
    pageSize: number;
    columns: Array<any>;
  } = {
    loading: false,
    title: "",
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
        width: 300
      },
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        render: category => {
          console.log(category);
          return <div>category</div>;
        }
        //   category &&
        //   category.map((v, index) => (
        //     <Tag
        //       key={index}
        //       color={color[Math.floor(Math.random() * color.length)]}
        //     >
        //       {v}
        //     </Tag>
        //   ))
      },
      {
        title: "访问次数",
        dataIndex: "readedCount",
        key: "readedCount",
        width: 50
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
    this.props.history.push("/admin/article-add", { id });
  };

  private handleDelete = (id: number) => {
    this.props.delArticle({ id });
  };

  public componentDidMount() {
    const { title, pageNo, pageSize } = this.state;
    this.props.getArticleListAll();
    // this.props.getArticleList({
    //   title,
    //   pageNo,
    //   pageSize
    // });
  }

  private handleSubmit = e => {
    e.preventDefault();
    const { pageNo, pageSize } = this.state;
    const { getArticleList, getArticleStatus } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { title = "" } = values;
        await this.setState({
          pageNo: 1,
          title
        });
        getArticleStatus(true);
        getArticleList({
          title,
          pageNo,
          pageSize
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { article_list, list_loading } = this.props.article;
    const { columns } = this.state;
    return (
      <div id="article">
        <AdminLayout>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("title")(
                <Input placeholder="请输入标题" allowClear={true} />
              )}
            </Form.Item>
            <Form.Item>
              <Button className="mr10" type="primary" htmlType="submit">
                search
              </Button>
              <Link to="/admin/article-add">
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

const mapDispatchToProps = {
  getArticleListAll: Article.instance.getArticleListAll,
  getArticleList: Article.instance.getArticleList,
  delArticle: Article.instance.delArticle,
  getArticleStatus: Article.instance.getArticleStatus
};
const M_article = connect(mapStateToProps, mapDispatchToProps)(Article_doc);
export default Form.create({ name: "horizontal_login" })(M_article);
