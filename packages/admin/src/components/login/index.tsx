import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Form } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import { User } from "@actions/index";
import { IState } from "@reducer/index";

interface PageDispatchProps {
  doLogin: (obj: any) => void;
}

interface Props {
  doLogin: () => any;
}

const Login: React.FunctionComponent<
  PageDispatchProps & RouteComponentProps & Props
> = ({ doLogin, history }) => {
  const onFinish = (values) => {
    doLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <Card className="login-form" style={{ width: 300, borderRadius: 4 }}>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={
                <SmileOutlined
                  type="user"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={
                <SmileOutlined
                  type="lock"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
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
)(Login);
