import React, { Component, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Table, Modal, Form, Input, Button, Tag } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { color } from "../../../utils";
import { IState } from "@reducer";
import { Category } from "@actions";

import AdminLayout from "../../common/adminLayout";

interface Props {
  getCategory: Function;
  get_category_all: Function;
  createCategory: Function;
  delCategory: Function;
}

export type IProps = Props &
  Pick<IState, "category"> &
  FormComponentProps &
  RouteComponentProps;

@(Form.create({ name: "categoy" }) as any)
@(connect(
  ({ category }: IState) => ({
    category
  }),
  {
    getCategory: Category.instance.getCategory,
    get_category_all: Category.instance.getCategoryAll,
    createCategory: Category.instance.createCategory,
    delCategory: Category.instance.delCategory
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
      title: "分类",
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
          <Button
            ghost
            type="danger"
            onClick={this.handleClick.bind(this, record)}
          >
            delete
          </Button>
        </span>
      )
    }
  ];

  state = {
    visible: false,
    category: ""
  };

  public componentDidMount() {
    this.props.get_category_all();
  }

  public componentWillReceiveProps(np) {
    if (this.props.category !== np.category) {
      this.setState({ visible: false });
    }
  }

  // 创建标签
  private handleOk = () =>
    this.state.category &&
    this.props.createCategory({ name: this.state.category });

  private handleCancel = () =>
    this.setState({
      visible: false
    });

  private handleChange = (e: ChangeEvent<any>) => {
    this.setState({
      category: e.target.value
    });
  };

  private handleSubmit = (e: SyntheticEvent) => {
    /**
     * 搜索分类
     * @params {
     *    name: string,
     *    pageNo: number,
     *    pageSize: number
     *   }
     */
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);

      if (!err) {
        const { name = "" } = values;
        this.props.getCategory({
          name,
          pageNo: 1,
          pageSize: 10
        });
      }
    });
  };

  /**
   * 点击删除
   */
  private handleClick(record) {
    this.props.delCategory({ id: record.id });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { category_list_all } = this.props.category;
    const { visible, category } = this.state;
    return (
      <div id="article">
        <AdminLayout>
          <Modal
            title="分类"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input
              placeholder="请输入分类"
              value={category}
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
            dataSource={category_list_all}
            rowKey={record => record.id}
          />
        </AdminLayout>
      </div>
    );
  }
}
