import React, { Component, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Table, Modal, Form, Input, Button, Tag, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { color } from "../../../utils";
import { IState } from "@reducer";
import { Star } from "@actions";

import AdminLayout from "../../common/adminLayout";

interface Props {
  getStar: Function;
  get_star_all: Function;
  createStar: Function;
  delStar: Function;
}

export type IProps = Props &
  Pick<IState, "star"> &
  FormComponentProps &
  RouteComponentProps;

@(Form.create({ name: "star" }) as any)
@(connect(
  ({ star }: IState) => ({
    star
  }),
  {
    getStar: Star.instance.getStar,
    get_star_all: Star.instance.getStarAll,
    createStar: Star.instance.createStar,
    delStar: Star.instance.delStar
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
      dataIndex: "title"
    },
    {
      title: "url",
      dataIndex: "url"
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
    title: "",
    url: ""
  };

  public componentDidMount() {
    this.props.get_star_all();
  }

  public componentWillReceiveProps(np) {
    if (this.props.star !== np.star) {
      this.setState({ visible: false });
    }
  }

  // 创建标签
  private handleOk = () => {
    const { title, url } = this.state;
    if (title && url) {
      this.props.createStar({ title, url });
    } else {
      message.error("标题或者url为空");
    }
  };

  private handleCancel = () =>
    this.setState({
      visible: false
    });

  private handleChange = (e: ChangeEvent<any>, name: string) => {
    this.setState({
      [name]: e.target.value
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
        const { title = "" } = values;
        this.props.getStar({
          title,
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
    this.props.delStar({ id: record.id });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { star_list_all } = this.props.star;
    const { visible, title, url } = this.state;
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
              placeholder="请输入标题"
              value={title}
              onChange={e => this.handleChange(e, "title")}
            ></Input>
            <Input
              placeholder="请输入链接"
              value={url}
              onChange={e => this.handleChange(e, "url")}
            ></Input>
          </Modal>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("title")(
                <Input placeholder="请输入标题" allowClear={true}></Input>
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
            dataSource={star_list_all}
            rowKey={record => record.id}
          />
        </AdminLayout>
      </div>
    );
  }
}
