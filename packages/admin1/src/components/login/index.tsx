import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Form } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import { ActionUser } from "@actions";
import { IState } from "@reducer";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 99vw;
  height: 99vh;
  position: relative;
  .login-form {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%);
  }
`;
interface PageDispatchProps {
  doLogin: (obj: any) => void;
}

interface Props {
  doLogin: () => any;
}

const Login: React.FunctionComponent<
  PageDispatchProps & RouteComponentProps & Props
> = ({ doLogin, history, ...props }) => {
  console.log(props);

  const onFinish = (values) => {
    doLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default connect(
  ({ user }: IState) => ({
    user,
  }),
  {
    doLogin: ActionUser.doLogin,
  }
)(Login);
