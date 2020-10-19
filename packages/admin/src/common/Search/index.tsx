import "./index.less";

import React, { useContext, SyntheticEvent } from "react";
import { Form, Row, Input, Button, Col } from "antd";
import { searchFields } from "../../components/user";

export interface IFieldItem {
  label: React.ReactNode;
  field: string;
  rules?: Array<any>;
  msg?: string;
  children?: React.ReactNode;
}
interface ISearchProps {
  onSearchBtn?: (arg: any) => void;
  onReset?: Function;
}

const Search: React.FunctionComponent<ISearchProps> = ({
  onSearchBtn,
  onReset,
}) => {
  const fields: IFieldItem[] = useContext(searchFields);
  const [form] = Form.useForm();
  const getFields = () => {
    return fields.reduce((acc, field: IFieldItem, index) => {
      acc.push(
        <Form.Item
          label={field.label}
          key={`${field.label}`}
          name={field.field}
          rules={field.rules}
        >
          {field.children ? (
            field.children
          ) : (
            <Input
              style={{ width: 180 }}
              placeholder={field.msg || "placeholder"}
            />
          )}
        </Form.Item>
      );
      return acc;
    }, []);
  };
  const handleReset = () => form.resetFields();
  const onFinish = (values) => {
    onSearchBtn(
      Object.keys(values).reduce((acc, item) => {
        if (values[item]) {
          acc[item] = values[item];
        }
        return acc;
      }, {})
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      className="search-wrapper"
      layout="inline"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row className="search-wrapper-content">
        {getFields()}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default Search;
