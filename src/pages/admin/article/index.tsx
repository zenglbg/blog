import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Form, Input, Button, Tag } from "antd";
import Router from "next/router";
import Link from "next/link";

import { ArticleState } from "../../../redux/reducer";
import { articleActions, ArticleAction } from "../../../redux/actions";
const { getArticleList } = articleActions;
import AdminLayout from "../../../components/adminLayout";

interface Props {
  form: any;
  getArticleList: (obj: any) => void;
}
interface State {
  loading: boolean;
}

export type IProps = Props & ArticleState;

export class Article extends Component<IProps, State> {
  state = { loading: false, title: "blog", pageNo: 1, pageSize: 10 };

  public componentDidMount() {
    console.log(this.props);
    const { title, pageNo, pageSize } = this.state;
    this.props.getArticleList({
      title,
      pageNo,
      pageSize
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <div id="article">
        <AdminLayout>
          <Form layout="inline">
            <Form.Item>
              {getFieldDecorator("title")(
                <Input placeholder="请输入标题" allowClear={true} />
              )}
            </Form.Item>
            <Form.Item>
              <Button className="mr10" type="primary" htmlType="submit">
                search
              </Button>
              <Link href="/admin/article-add">
                <Button type="primary">create</Button>
              </Link>
            </Form.Item>
          </Form>
          <Table className="mt10" loading={loading} />
        </AdminLayout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article
});

const mapDispatchToProps = {
  getArticleList
};
const M_article = connect(mapStateToProps, mapDispatchToProps)(Article);
export default Form.create({ name: "horizontal_login" })(M_article);
