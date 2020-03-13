import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Table, Modal, Form, Input, Button, Tag } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { color } from "../../../utils";
import { IState } from "@reducer";
import { Tags } from "@actions";

import AdminLayout from "../../common/adminLayout";

interface Props {
  getTagAll: Function;
}

export type IProps = Props &
  Pick<IState, "tag"> &
  FormComponentProps &
  RouteComponentProps;

@(Form.create({ name: "tag" }) as any)
@(connect(
  (state: IState) => ({
    tag: state.tag
  }),
  {
    getTagAll: Tags.instance.getTagAll
  }
) as any)
export default class Article_doc extends Component<IProps> {
  columns: Array<any> = [
    {
      title: "序号",
      dataIndex: "id",
      key: "index",
      width: 80,
      align: "center"
    },
    {
      title: "标签",
      dataIndex: "name",
      render: name => (
        <Tag color={color[Math.floor(Math.random() * color.length)]}>
          {name}
        </Tag>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createdAt"
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      align: "center",
      render: record => (
        <span>
          <Button ghost type="danger" onClick={this.handleClick}>
            delete
          </Button>
        </span>
      )
    }
  ];
  state = {
    visible: false,
    tag: null
  };
  public componentDidMount() {
    this.props.getTagAll();
  }
  private handleOk = () => {};

  private handleCancel = () =>
    this.setState({
      visible: false
    });

  private handleChange = () => {};

  private handleSubmit = () => {};

  private handleClick = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tag_list_all } = this.props.tag;
    const { visible, tag } = this.state;
    return (
      <div id="article">
        <AdminLayout>
          <Modal
            title="标签"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input
              placeholder="请输入标签"
              value={tag}
              onChange={this.handleChange}
            ></Input>
          </Modal>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("name")(
                <Input placeholder="请输入标签" allowClear={true}></Input>
              )}
            </Form.Item>
            <Form.Item>
              <Button className="mr10" type="primary" htmlType="submit">
                search
              </Button>
              <Button onClick={() => this.setState({ visible: true })}>
                create
              </Button>
            </Form.Item>
          </Form>
          <Table
            columns={this.columns}
            dataSource={tag_list_all}
            rowKey={record => record.id}
          />
        </AdminLayout>
      </div>
    );
  }
}
