import "./index.less";
import React, { SyntheticEvent, useState } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Icon, Form, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { IState } from "@reducer/index";
import { User } from "@actions/index";
import { Usersr } from "@service/index";

import FormList from "./child/formList";
import Rmodal from "./child/modal";

type PageDispatchProps = {
  doLogin: Function;
  get_validate_code: Function;
  register: Function;
};

interface State {}

interface IRegisterProps {}

const Register: React.FunctionComponent<
  FormComponentProps & PageDispatchProps & IRegisterProps
> = ({ form, register }) => {
  const { getFieldDecorator, getFieldValue, validateFields } = form;
  const [visible, setVisible] = useState(false);

  const get_validate_code = () => {
    /**获取验证码 */
  };
  const handleAuth = (e: SyntheticEvent) => {
    /**
     * 验证验证码，并打开密码输入弹窗
     */
    e.preventDefault();
    validateFields(
      ["name", "email", "validate_code"],
      (err: Error, { user_name, user_email, validate_code }) => {
        if (!err) {
          setVisible(true);
        }
      }
    );
  };

  const handleOk = (e: SyntheticEvent) => {
    /**
     * 注册按钮，请求注册
     */
    e.preventDefault();
    validateFields(["name", "email", "password"], (err: Error, values) => {
      if (!err) {
        register(values);
      }
    });
  };

  const handleCannel = () => setVisible(false);

  return (
    <div className="register">
      <Card className="register-form" style={{ width: 400, borderRadius: 4 }}>
        <FormList
          getFieldDecorator={getFieldDecorator}
          get_validate_code={get_validate_code}
          handleAuth={handleAuth}
        />

        {/* 输入密码 */}
        <Rmodal
          visible={visible}
          getFieldDecorator={getFieldDecorator}
          getFieldValue={getFieldValue}
          handleOk={handleOk}
          handleCannel={handleCannel}
        />
        {/* 输入密码 */}
      </Card>
    </div>
  );
};

export default connect(({ user }: IState) => ({ user }), {
  doLogin: User.doLogin,
  register: User.register,
})(Form.create({ name: "register" })(Register));
