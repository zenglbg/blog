import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.less";

import React, { Component, SyntheticEvent } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import Editor from "../../common/editor";
import Preview from "../../common/preview";
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
  updateArticle: Function;
  getArticleItemSuccess: Function;
  writeArticle: Function;
}
interface State {}

type IProps = Props &
  FormComponentProps &
  RouteComponentProps &
  Pick<IState, "tag"> &
  Pick<IState, "article"> &
  Pick<IState, "category">;
export class ArticleAdd extends Component<IProps, State> {
  private formItemLayout = formItemLayout;

  public componentDidMount() {
    const { get_category_all, get_tag_all, getArticleItem } = this.props;
    get_category_all();
    get_tag_all();
    this.getUpdatePage();
  }

  public componentWillUnmount() {
    this.props.getArticleItemSuccess({
      article_item: null
    });
  }

  private getUpdatePage = () => {
    const { article_item } = this.props.article;
    const { writeArticle } = this.props;
    if (article_item) {
      const {
        title,
        author,
        summary,
        category,
        tag,
        content
      } = this.props.article.article_item;
      this.props.form.setFieldsValue({ title, author, summary, category, tag });
      writeArticle(content);
    }
  };

  public handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(`提交文章`);
    const { article_item, content } = this.props.article;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          ...values,
          category: String(values.category),
          tag: String(values.tag),
          content
        };
        if (article_item && article_item.id) {
          params.id = article_item.id;
          this.props.updateArticle(params);
        } else {
          this.props.createArticle(params);
        }
      }
    });
  };

  private selectList = items =>
    items &&
    items.map((item: any, index) => (
      <Select.Option value={item.name} key={index}>
        {item.name}
      </Select.Option>
    ));

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { article_item, content } = this.props.article;
    const { category_list_all = [] } = this.props.category;
    const { tag_list_all = [] } = this.props.tag;
    const { writeArticle } = this.props;

    const txt = article_item ? "update" : "create";

    return (
      <div className="admin-article">
        <div className="admin-article">
          <Form onSubmit={this.handleSubmit} {...this.formItemLayout}>
            <Form.Item label="标题">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请输入标题" }]
              })(<Input placeholder="请输入标题" />)}
            </Form.Item>
            <Form.Item label="作者">
              {getFieldDecorator("author", {
                rules: [{ required: true, message: "请输入作者" }],
                initialValue: "zenglbg"
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
              })(<Select>{this.selectList(category_list_all)}</Select>)}
            </Form.Item>
            <Form.Item label="标签">
              {getFieldDecorator("tag", {
                rules: [{ required: true, message: "请输入标签" }]
              })(<Select>{this.selectList(tag_list_all)}</Select>)}
            </Form.Item>
            <Form.Item label="内容" wrapperCol={{ span: 24 }}>
              <div className="content-box">
                <div className="editor-wrapper">
                  <Editor markdown={content} setMarkdown={writeArticle} />
                </div>
                <div className="preview">
                  <Preview markdown={content} />
                </div>
              </div>
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
  updateArticle: Article.instance.updateArticle,
  getArticleItem: Article.instance.getArticleItem,
  getArticleItemSuccess: Article.instance.getArticleItemSuccess,
  writeArticle: Article.instance.writeArticle
};

export default Form.create({ name: "article_add" })(
  connect(mapStateToProps, mapDispatchToProps)(ArticleAdd)
);
