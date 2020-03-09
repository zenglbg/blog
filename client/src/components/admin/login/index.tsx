import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Input, Button, Icon, Form } from "antd";
import "./index.less";

import { User } from "../../../redux/actions";

type PageDispatchProps = {
  doLogin: (obj: any) => void;
};

interface Props {
  form: any;
  doLogin(): any;
}
interface State {}

type IProps = PageDispatchProps & Props;

export class Login extends Component<IProps, State> {
  state = {
    isLoading: false
  };
  public handleSubmit = e => {
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
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入用户名" }]
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
                rules: [{ required: true, message: "请输入密码" }]
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

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  doLogin: User.instance.doLogin
};
const MyLogin = Form.create({ name: "normal_login" })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(MyLogin);
