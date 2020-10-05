import React from "react";
import { Input, Button,   Form } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { ValidatorUtils } from "@utils/validate";

export default function FomrList({
  get_validate_code,
  handleAuth,
}) {
  return (
    <Form onFinish={handleAuth}>
      <Form.Item
        name='name'
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
          <Input
            prefix={<SmileOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="请输入用户名"
          />
      </Form.Item>
      <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: "邮箱账户不能为空！"
        },
         
        {
          validator(rule: any, value: any, callback: any) {
            ValidatorUtils.isEmail(value)
              ? callback()
              : callback(new Error("邮箱账户格式不正确！"));
          },
        },
      ]}
      >
          <Input
            prefix={<SmileOutlined type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="text"
            placeholder="请输入邮箱账户！"
          />
            <Input.Search />
      </Form.Item>

      {/* <Form.Item>
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
      */}
      <Button
        type="primary"
        className="login-form-button"
        block
      >
        注册
      </Button>
    </Form>
  );
}
