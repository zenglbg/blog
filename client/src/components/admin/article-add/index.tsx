import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./index.less";
import React, { Component } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import AdminLayout from "../../common/adminLayout";
import { Category, Tag, Article } from "@actions";
import { IState } from "@reducer";

interface Props {
  get_category_all: Function;
  get_tag_all: Function;
  getArticleItem: Function;
  createArticle: Function;
}
interface State {
  editorState: any;
}

type IProps = Props &
  FormComponentProps &
  RouteComponentProps &
  Pick<IState, "tag"> &
  Pick<IState, "article"> &
  Pick<IState, "category">;
export class ArticleAdd extends Component<IProps, State> {
  state = {
    id: "",
    category: "",
    tag: "",
    editorState: EditorState.createEmpty()
  };

  public componentDidMount() {
    const { get_category_all, get_tag_all, getArticleItem } = this.props;
    get_category_all();
    get_tag_all();
    getArticleItem();
  }
  private onEditorStateChange = (editorState: any) => {
    console.log(editorState);
    this.setState({
      editorState
    });
  };

  public handleSubmit = e => {
    e.preventDefault();
    const { article_item } = this.props.article;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const content = draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        );
        let params = {
          ...values,
          category: String(values.category),
          tag: String(values.tag),
          content
        };
        if (article_item && article_item.id) {
        } else {
          this.props.createArticle(params);
        }
        console.log(params);
      }
    });
  };

  public render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
        xxl: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 }
      }
    };
    const { editorState, id } = this.state;
    const { getFieldDecorator } = this.props.form;
    const txt = id ? "update" : "create";
    return (
      <div className="admin-article">
        <AdminLayout>
          <div className="admin-article">
            <Form onSubmit={this.handleSubmit} {...formItemLayout}>
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

const mapStateToProps = ({ tag, category, article }) => ({
  tag,
  category,
  article
});

const mapDispatchToProps = {
  get_category_all: Category.instance.getCategoryAll,
  get_tag_all: Tag.instance.getTagAll,
  createArticle: Article.instance.createArticle,
  getArticleItem: Article.instance.getArticleItem
  // getArticleItem: (payload: any) => ({
  //   type: "GET_ARTICLE_ITEM",
  //   payload: payload
  // })
};

export default Form.create({ name: "article_add" })(
  connect(mapStateToProps, mapDispatchToProps)(ArticleAdd)
);
