import React, { Component, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Table, Modal, Form, Input, Button, Tag, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { color } from "@utils";
import { IState } from "@reducer";
import { Tags, Option as Option_action } from "@actions";
import { Option } from "@service";
import { timingSafeEqual } from "crypto";

interface Props {
  getTag: Function;
  createTag: Function;
  delTag: Function;
  list_all: Function;
}

@(Form.create({ name: "option" }) as any)
@(connect(
  ({ tag, option }: IState) => ({
    tag,
    option,
  }),
  {
    getTag: Tags.instance.getTag,
    createTag: Tags.instance.createTag,
    delTag: Tags.instance.delTag,
    list_all: Option_action.instance.get_list_all,
  }
) as any)
export default class Article_doc extends Component<
  Props &
    Pick<IState, "tag"> &
    Pick<IState, "option"> &
    FormComponentProps &
    RouteComponentProps
> {
  columns: Array<any> = [
    {
      title: "序号",
      dataIndex: "option_id",
      key: "index",
      width: 80,
      align: "center",
    },
    {
      title: "选项名",
      dataIndex: "option_name",
      render: (name) => (
        <Tag color={color[Math.floor(Math.random() * color.length)]}>
          {name}
        </Tag>
      ),
    },
    {
      title: "选项值",
      dataIndex: "option_values",
      render: (name) => (
        <Tag color={color[Math.floor(Math.random() * color.length)]}>
          {name}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      align: "center",
      render: (record) => (
        <span>
          <Button
            ghost
            type="danger"
            onClick={this.handleClick.bind(this, record)}
          >
            delete
          </Button>
        </span>
      ),
    },
  ];

  state = {
    visible: false,
    list_all: null,
  };

  public componentDidMount() {
    this.props.list_all();
  }

  public componentWillReceiveProps(np) {
    if (this.props.tag !== np.tag) {
      this.setState({ visible: false });
    }
  }

  // 创建标签
  private handleOk = () =>
    this.props.form.validateFields(
      ["option_name", "option_values"],
      (err, { option_name, option_values }) => {
        Option.add(option_name, option_values).subscribe(({ response }) => {
          if (response.code === 200) {
            this.props.list_all();
            this.setState({ visible: false });
          } else {
            message.error(response.msg);
          }
        });
      }
    );

  private handleCancel = () =>
    this.setState({
      visible: false,
    });

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
    this.props.form.validateFields(["name"], (err, values) => {
      if (!err) {
        const { name = "" } = values;
        this.props.getTag({
          name,
          pageNo: 1,
          pageSize: 10,
        });
      }
    });
  };

  /**
   * 点击删除
   */
  private handleClick(record) {
    Option.del({ option_id: record.id }).subscribe(({ response }) => {
      if (response.code == 200) this.props.list_all();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { list_all } = this.props.option;
    const { visible } = this.state;
    return (
      <div id="article">
        <Modal
          title="网站管理"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator("option_name")(<Input placeholder="选项名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("option_values")(
                <Input placeholder="选项值" />
              )}
            </Form.Item>
          </Form>
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
          dataSource={list_all}
          rowKey={(record: any) => record.option_id}
        />
      </div>
    );
  }
}
