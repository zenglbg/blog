import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./index.less";
import React, { Component, SyntheticEvent } from "react";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import AdminLayout from "../../common/adminLayout";
import { Category, Tag, Article } from "@actions";
import { IState } from "@reducer";

import SForm from "./child/Form";

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
  state = {
    editorState: EditorState.createEmpty()
  };

  public componentDidMount() {
    const { get_category_all, get_tag_all, getArticleItem } = this.props;
    get_category_all();
    get_tag_all();
    getArticleItem();
  }
  public shouldComponentUpdate(np, ns) {
    if (this.props.article.article_item === np.article.article_item) {
      return false;
    } else {
      return true;
    }
  }
  public componentWillUnmount() {
    this.props.getArticleItemSuccess({
      article_item: null
    });
  }

  private onEditorStateChange = (editorState: any) => {
    console.log(33333, editorState);
    this.setState({
      editorState
    });
  };

  private getDetail = (article_item: any, content: any) => {
    if (article_item) {
      const contentBlock = htmlToDraft(article_item.content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    } else {
      return content;
    }
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
    const { article_item } = this.props.article;
    const { category_list_all = [] } = this.props.category;
    const { tag_list_all = [] } = this.props.tag;
    const _article_item = article_item
      ? article_item
      : {
          title: "",
          summary: "",
          author: "zenglbg",
          content: editorState,
          category: category_list_all,
          tag: tag_list_all
        };
    const txt = article_item ? "update" : "create";
    return (
      <div className="admin-article">
        <AdminLayout>
          <div className="admin-article">
            {article_item ? (
              <SForm
                {..._article_item}
                content={this.getDetail(article_item, editorState)}
                onEditorStateChange={this.onEditorStateChange}
                handleSubmit={this.handleSubmit}
                txt={txt}
              />
            ) : (
              <SForm
                {..._article_item}
                content={this.getDetail(article_item, editorState)}
                onEditorStateChange={this.onEditorStateChange}
                handleSubmit={this.handleSubmit}
                txt={txt}
              />
            )}
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
  getArticleItem: Article.instance.getArticleItem,
  getArticleItemSuccess: Article.instance.getArticleItemSuccess
};

export default Form.create({ name: "article_add" })(
  connect(mapStateToProps, mapDispatchToProps)(ArticleAdd)
);
