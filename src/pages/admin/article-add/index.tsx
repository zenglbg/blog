import React, { Component } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { connect } from "react-redux";
import AdminLayout from "../../../components/adminLayout";
interface Props {}
interface State {}

type IProps = Props & FormComponentProps;
export class ArticleAdd extends Component<IProps, State> {
  state = {};

  private onEditorStateChange = (val: any) => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <AdminLayout>
          <Form>
            <Form.Item label="标题">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请输入标题" }]
              })(<Input placeholder="请输入标题" />)}
            </Form.Item>
            <Form.Item label="作者">
              {getFieldDecorator("author", {
                rules: [{ required: true, message: "请输入作者" }]
              })(<Input placeholder="请输入作者" />)}
            </Form.Item>
            <Form.Item label="摘要">
              {getFieldDecorator("summary", {
                rules: [{ required: true, message: "请输入摘要" }]
              })(<Input placeholder="请输入摘要" />)}
            </Form.Item>
            <Form.Item label="分类">
              {getFieldDecorator("category", {
                rules: [{ required: true, message: "请输入分类" }]
              })(<Input placeholder="请输入分类" />)}
            </Form.Item>
            <Form.Item label="标签">
              {getFieldDecorator("tag", {
                rules: [{ required: true, message: "请输入标签" }]
              })(<Input placeholder="请输入标签" />)}
            </Form.Item>
            <Form.Item label="内容" wrapperCol={{ span: 19 }}></Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="article-button">
                <Button type="primary" htmlType="submit">
                  {"txt"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </AdminLayout>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default Form.create({ name: "article_add" })(
  connect(mapStateToProps, mapDispatchToProps)(ArticleAdd)
);
