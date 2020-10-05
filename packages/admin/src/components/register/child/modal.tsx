import React from "react";
import { Input,   Form, Modal } from "antd";
import { ValidatorUtils } from "@utils/validate";
import { SmileOutlined } from "@ant-design/icons";

export default function Rmodal({
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
        <Form.Item name="password" rules={[
              {
                required: true,
                message: "密码不能为空！"
              },
              {
                validator(rule: any, value: any = "", callback: any) {
                  ValidatorUtils.isBetween(value.length, 5, 21)
                    ? callback()
                    : callback(new Error("密码长度不正确！"));
                },
              },
            ]}>
            <Input
              prefix={<SmileOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="请输入密码"
            />
        </Form.Item>
        <Form.Item name="user_password" dependencies={["password"]} rules={[
              {
                required: true,
                message: "密码不能为空！"
              },
              
              {
                validator(rule , value ) {
                 return ValidatorUtils.isBetween(value.length, 5, 21)
                    ? Promise.resolve()
                    : Promise.reject(new Error("密码长度不正确！"))
                },
              },
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if(!value || getFieldValue("password") === value)
                  {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不一致！"));
                },
              }),
              
            ]}>
            <Input
              prefix={<SmileOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="请输入密码"
            />
        </Form.Item>
    </Modal>
  );
}
