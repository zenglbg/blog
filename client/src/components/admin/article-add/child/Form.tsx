import React, { PureComponent, SyntheticEvent } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

interface Props {
  title?: string;
  author?: string;
  summary?: string;
  category: Array<any>;
  tag: Array<any>;
  content: any;
  txt: string;
  onEditorStateChange: (editorState: EditorState) => void;
  handleSubmit: (e: SyntheticEvent) => void;
}
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
@(Form.create({ name: "article-item" }) as any)
export default class FormApp extends PureComponent<Props & FormComponentProps> {
  private formItemLayout = formItemLayout;

  public componentDidMount() {
    // const { title, author, summary, category, tag } = this.props;
    // if (title) {
    //   this.props.form.setFieldsValue({
    //     title,
    //     author,
    //     summary
    //     // category,
    //     // tag
    //   });
    // }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const {
      title,
      author,
      summary,
      category,
      tag,
      content,
      txt,
      onEditorStateChange,
      handleSubmit
    } = this.props;
    const categoryOption =
      category.length > 1 ? (
        category.map((item: any, index) => (
          <Select.Option value={item.name} key={index}>
            {item.name}
          </Select.Option>
        ))
      ) : (
        <Select.Option value={category[0]} key="category">
          {category[0]}
        </Select.Option>
      );
    const tagOption =
      tag.length > 1 ? (
        tag.map((item: any, index) => (
          <Select.Option value={item.name} key={index}>
            {item.name}
          </Select.Option>
        ))
      ) : (
        <Select.Option value={tag[0]} key="tag">
          {tag[0]}
        </Select.Option>
      );
    return (
      <Form onSubmit={handleSubmit} {...this.formItemLayout}>
        <Form.Item label="标题">
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "请输入标题" }],
            initialValue: title
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item label="作者">
          {getFieldDecorator("author", {
            rules: [{ required: true, message: "请输入作者" }],
            initialValue: author
          })(<Input placeholder="请输入作者" />)}
        </Form.Item>
        <Form.Item label="摘要">
          {getFieldDecorator("summary", {
            rules: [{ required: true, message: "请输入摘要" }],
            initialValue: summary
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
            editorState={content}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
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
    );
  }
}
