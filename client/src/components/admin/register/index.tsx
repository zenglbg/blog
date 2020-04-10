import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Icon, Form, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { IState } from "@reducer";
import { User } from "../../../redux/actions";
import { ValidatorUtils } from "@utils";

type PageDispatchProps = {
  doLogin: (obj: any) => void;
};

interface Props {
  form: any;
  doLogin(): any;
}
interface State {}

@(Form.create({ name: "register" }) as any)
@(connect(({ user }: IState) => ({ user }), {
  doLogin: User.instance.doLogin,
}) as any)
export default class Register extends Component<
  FormComponentProps & PageDispatchProps & Props,
  State
> {
  state = {
    isLoading: false,
    isPassword: false,
  };
  public handleChange(key: string, val: any) {
    this.setState({
      [key]: val,
    });
  }
  public handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: Error, values) => {
      if (!err) {
        this.props.doLogin(values);
      }
    });
  };

  public handleOk = () => {
    this.handleChange("isPassword", true);
  };
  public handleCannel = () => {
    this.handleChange("isPassword", false);
  };

  render() {
    const { isPassword } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div className="register">
        <Card className="register-form" style={{ width: 300, borderRadius: 4 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("user_name", {
                rules: [
                  {
                    required: true,
                    message: "请输入用户名",
                  },
                ],
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
              {getFieldDecorator("user_email", {
                rules: [
                  {
                    validator(rule: any, value: any, callback: any) {
                      ValidatorUtils.isNotEmpty(value)
                        ? callback()
                        : callback(new Error("邮箱账户不能为空！"));
                    },
                  },
                  {
                    validator(rule: any, value: any, callback: any) {
                      ValidatorUtils.isEmail(value)
                        ? callback()
                        : callback(new Error("邮箱账户格式不正确！"));
                    },
                  },
                ],
              })(<Input placeholder="请输入邮箱账户" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("validate_code", {
                rules: [
                  {
                    validator(rule: any, value: any, callback: any) {
                      ValidatorUtils.isNotEmpty(value)
                        ? callback()
                        : callback(new Error("验证码不能为空"));
                    },
                  },
                  {
                    validator(rule: any, value: any = "", callback: any) {
                      ValidatorUtils.isBetween(value.length, 5, 7)
                        ? callback()
                        : callback(new Error("验证码长度不正确！"));
                    },
                  },
                ],
              })(<Input type="text" placeholder="请输入验证码" />)}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              注册
            </Button>
          </Form>
        </Card>

        {/* 输入密码 */}

        <Modal
          title="密码输入"
          visible={isPassword}
          onOk={this.handleOk}
          onCancel={this.handleCannel}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator(rule: any, value: any, callback: any) {
                      ValidatorUtils.isNotEmpty(value)
                        ? callback()
                        : callback(new Error("密码不能为空！"));
                    },
                  },
                  {
                    validator(rule: any, value: any = "", callback: any) {
                      ValidatorUtils.isBetween(value.length, 5, 21)
                        ? callback()
                        : callback(new Error("密码长度不正确！"));
                    },
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("user_password", {
                rules: [
                  {
                    validator(rule: any, value: any, callback: any) {
                      ValidatorUtils.isNotEmpty(value)
                        ? callback()
                        : callback(new Error("密码不能为空！"));
                    },
                  },
                  {
                    validator(rule: any, value: any = "", callback: any) {
                      ValidatorUtils.isBetween(value.length, 5, 21)
                        ? callback()
                        : callback(new Error("密码长度不正确！"));
                    },
                  },
                  {
                    validator(rule: any, value: any = "", callback: any) {
                      const password = getFieldValue("password");

                      value && value !== password
                        ? callback(new Error("两次密码不一致！"))
                        : callback();
                    },
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
          </Form>
        </Modal>

        {/* 输入密码 */}
      </div>
    );
  }
}
