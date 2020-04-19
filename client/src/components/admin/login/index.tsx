import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Icon, Form } from "antd";

import { User } from "@actions";
import { IState } from "@reducer";

type PageDispatchProps = {
  doLogin: (obj: any) => void;
};

interface Props {
  form: any;
  doLogin(): any;
}
interface State {}

type IProps = PageDispatchProps & Props;
@(Form.create({ name: "normal_login" }) as any)
@(connect(
  ({ user }: IState) => ({
    user,
  }),
  {
    doLogin: User.instance.doLogin,
  }
) as any)
export default class Login extends Component<IProps, State> {
  state = {
    isLoading: false,
  };
  public handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.doLogin(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <Card className="login-form" style={{ width: 300, borderRadius: 4 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("user_name", {
                rules: [{ required: true, message: "请输入用户名" }],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("user_password", {
                rules: [{ required: true, message: "请输入密码" }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>{" "}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              登录
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}
