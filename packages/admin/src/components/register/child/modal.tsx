import React from "react";
import { Input, Icon, Form, Modal } from "antd";
import { ValidatorUtils } from "@utils/index";

export default function Rmodal({
  getFieldDecorator,
  getFieldValue,
  visible,
  handleOk,
  handleCannel,
}) {
  console.log(visible, "visible");
  return (
    <Modal
      title="密码输入"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCannel}
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
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
