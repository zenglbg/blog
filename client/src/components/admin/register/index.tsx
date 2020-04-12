import "./index.less";
import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Icon, Form, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { IState } from "@reducer";
import { User } from "@actions";
import { SrUser } from "@service";

import FormList from "./formList";
import Rmodal from "./modal";

type PageDispatchProps = {
  doLogin: Function;
  get_validate_code: Function;
  register: Function;
};

interface Props {}
interface State {}

@(Form.create({ name: "register" }) as any)
@(connect(({ user }: IState) => ({ user }), {
  doLogin: User.instance.doLogin,
  register: User.instance.register,
}) as any)
export default class Register extends Component<
  FormComponentProps & PageDispatchProps & Props,
  State
> {
  state = {
    isLoading: false,
    visible: false,
  };
  public handleChange(key: string, val: any) {
    this.setState({
      [key]: val,
    });
  }
  public handleCannel = () => {
    this.handleChange("visible", false);
  };
  public handleAuth = (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields(
      ["user_name", "user_email", "validate_code"],
      (err: Error, { user_name, user_email, validate_code }) => {
        if (!err) {
          SrUser.authCode(user_name, user_email, validate_code).subscribe(
            (isAuth) => isAuth && this.handleChange("visible", true)
          );
        }
      }
    );
  };
  public get_validate_code = () => {
    this.props.form.validateFields(
      ["user_name", "user_email"],
      (err: Error, { user_name, user_email }) => {
        if (!err) {
          SrUser.getCode(user_name, user_email).subscribe();
        }
      }
    );
  };

  public handleOk = (e: SyntheticEvent) => {
    e.preventDefault();

    this.props.form.validateFields(
      ["user_name", "user_email", "validate_code", "user_password"],
      async (err: Error, values) => {
        if (!err) {
          // SrUser.register(values).subscribe();
          this.props.register(values);
        }
      }
    );
  };

  public render() {
    const { visible } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div className="register">
        <Card className="register-form" style={{ width: 400, borderRadius: 4 }}>
          <FormList
            getFieldDecorator={getFieldDecorator}
            get_validate_code={this.get_validate_code}
            handleAuth={this.handleAuth}
          />
        </Card>

        {/* 输入密码 */}
        <Rmodal
          visible={visible}
          getFieldDecorator={getFieldDecorator}
          getFieldValue={getFieldValue}
          handleOk={this.handleOk}
          handleCannel={this.handleCannel}
        />
        {/* 输入密码 */}
      </div>
    );
  }
}
