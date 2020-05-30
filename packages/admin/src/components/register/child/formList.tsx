import React from "react";
import { Input, Button, Icon, Form } from "antd";
import { ValidatorUtils } from "@utils/index";

export default function FomrList({
  getFieldDecorator,
  get_validate_code,
  handleAuth,
}) {
  return (
    <Form onSubmit={handleAuth}>
      <Form.Item>
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message: "请输入用户名",
            },
          ],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="请输入用户名"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("email", {
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
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="text"
            placeholder="请输入邮箱账户！"
          />
          // <Input.Search
          //   placeholder="请输入邮箱账户！"
          //   onSearch={get_validate_code}
          //   enterButton="获取验证码"
          // />
        )}
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
        htmlType="submit"
        className="login-form-button"
        block
      >
        注册
      </Button>
    </Form>
  );
}
