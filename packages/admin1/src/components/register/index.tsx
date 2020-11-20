import React, { SyntheticEvent, useState } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Form, Modal } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { IState } from "@reducer";
import { ActionUser } from "@actions";
import { UserApi } from "@api";

import FormList from "./index-formList";
import Rmodal from "./index-modal";

const Wrapper = styled.div`
  width: 99vw;
  height: 99vh;
  position: relative;

  .register-form {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%);
  }
`;

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
    <Wrapper>
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
    </Wrapper>
  );
};

export default connect(({ user }: IState) => ({ user }), {
  doLogin: ActionUser.doLogin,
  register: ActionUser.register,
})(Register);
