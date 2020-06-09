import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Icon, Form } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { User } from "@actions/index";
import { IState } from "@reducer/index";

type PageDispatchProps = {
  doLogin: (obj: any) => void;
};

interface Props {
  form: any;
  doLogin(): any;
}

const Login: React.FunctionComponent<
  PageDispatchProps & RouteComponentProps & Props
> = ({ form, doLogin, history }) => {
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        doLogin(values);
      }
    });
  };

  return (
    <div className="login">
      <Card className="login-form" style={{ width: 300, borderRadius: 4 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("name", {
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
            {getFieldDecorator("password", {
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginTop: 10 }}
            block
            onClick={() => history.push("/register")}
          >
            注册
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default connect(
  ({ user }: IState) => ({
    user,
  }),
  {
    doLogin: User.doLogin,
  }
)(Form.create({ name: "normal_login" })(Login));
