import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.less";
import React, { Component } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import AdminLayout from "../../common/adminLayout";
import { Category, Tag, Article } from "@actions";
import { IState } from "@reducer";

interface Props {
  get_category_all: Function;
  get_tag_all: Function;
}
interface State {
  editorState: any;
}

type IProps = Props &
  FormComponentProps &
  Pick<IState, "tag"> &
  Pick<IState, "category">;
export class ArticleAdd extends Component<IProps, State> {
  state = {
    id: "",
    title: "",
    author: "",
    summary: "",
    category: "",
    tag: "",
    editorState: null
  };

  public componentDidMount() {
    const { get_category_all, get_tag_all } = this.props;
    get_category_all();
    get_tag_all();
    console.log(this.props);
  }

  private onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState, id } = this.state;
    const { getFieldDecorator } = this.props.form;
    const txt = id ? "update" : "create";
    console.log(txt);
    return (
      <div className="admin-article">
        <AdminLayout>
          <div className="admin-article">
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
              <Form.Item label="内容">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <div className="article-button">
                  <Button type="primary" htmlType="submit">
                    {txt}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </AdminLayout>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  get_category_all: Category.instance.getCategoryAll,
  get_tag_all: Tag.instance.getTagAll
};

export default Form.create({ name: "article_add" })(
  connect(mapStateToProps, mapDispatchToProps)(ArticleAdd)
);
