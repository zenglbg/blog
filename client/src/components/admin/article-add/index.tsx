import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.less";

import React, { Component, SyntheticEvent } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";

import AdminLayout from "../../common/adminLayout";
import { Category, Tags, Article } from "@actions";
import { IState } from "@reducer";

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
interface Props {
  get_category_all: Function;
  get_tag_all: Function;
  getArticleItem: Function;
  createArticle: Function;
  getArticleItemSuccess: Function;
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
  private formItemLayout = formItemLayout;

  state = {
    editorState: EditorState.createEmpty()
  };

  public componentDidMount() {
    const { get_category_all, get_tag_all, getArticleItem } = this.props;
    get_category_all();
    get_tag_all();
    getArticleItem();
  }
  // public shouldComponentUpdate(np, ns) {
  //   if (this.props.article.article_item === np.article.article_item) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  public componentWillUnmount() {
    this.props.getArticleItemSuccess({
      article_item: null
    });
  }

  private onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };

  public handleSubmit = (e: SyntheticEvent) => {
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
      }
    });
  };

  public render() {
    const { editorState } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { article_item } = this.props.article;
    const { category_list_all = [] } = this.props.category;
    const { tag_list_all = [] } = this.props.tag;

    const txt = article_item ? "update" : "create";
    const categoryOption =
      category_list_all &&
      category_list_all.map((item: any, index) => (
        <Select.Option value={item.name} key={index}>
          {item.name}
        </Select.Option>
      ));
    const tagOption =
      tag_list_all &&
      tag_list_all.map((item: any, index) => (
        <Select.Option value={item.name} key={index}>
          {item.name}
        </Select.Option>
      ));
    return (
      <div className="admin-article">
        <AdminLayout>
          <div className="admin-article">
            <Form onSubmit={this.handleSubmit} {...this.formItemLayout}>
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
                })(<Select>{categoryOption}</Select>)}
              </Form.Item>
              <Form.Item label="标签">
                {getFieldDecorator("tag", {
                  rules: [{ required: true, message: "请输入标签" }]
                })(<Select>{tagOption}</Select>)}
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
  get_tag_all: Tags.instance.getTagAll,
  createArticle: Article.instance.createArticle,
  getArticleItem: Article.instance.getArticleItem,
  getArticleItemSuccess: Article.instance.getArticleItemSuccess
};

export default Form.create({ name: "article_add" })(
  connect(mapStateToProps, mapDispatchToProps)(ArticleAdd)
);
