import "./index.less";
import React, { SyntheticEvent, useState } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Form, Modal } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import { IState } from "@reducer/index";
import { User } from "@actions/index";
import { Usersr } from "@service/index";

import FormList from "./child/formList";
import Rmodal from "./child/modal";

interface PageDispatchProps {
  doLogin: Function;
  get_validate_code: Function;
  register: Function;
}

interface State {}

interface IRegisterProps {}

const Register: React.FunctionComponent<PageDispatchProps & IRegisterProps> = ({
  register,
}) => {
  const [visible, setVisible] = useState(false);

  const get_validate_code = () => {
    /** 获取验证码 */
  };
  const handleAuth = ({ user_name, user_email, validate_code }) => {
    /**
     * 验证验证码，并打开密码输入弹窗
     */
    setVisible(true);
  };

  const handleOk = ({ name, email, password }) => {
    /**
     * 注册按钮，请求注册
     */
    register({ name, email, password });
  };

  const handleCannel = () => setVisible(false);

  return (
    <div className="register">
      <Card className="register-form" style={{ width: 400, borderRadius: 4 }}>
        <FormList
          get_validate_code={get_validate_code}
          handleAuth={handleAuth}
        />

        {/* 输入密码 */}
        <Rmodal
          visible={visible}
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
})(Register);
