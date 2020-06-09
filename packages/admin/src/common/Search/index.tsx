import React, { useContext, SyntheticEvent } from "react";
import { Form, Row, Input, Button, Col } from "antd";
import { FormComponentProps } from "antd/es/form";
import { searchFields } from "../../components/user";

export interface IFieldItem {
  label: React.ReactNode;
  field: string;
  rules?: Array<any>;
  msg?: string;
  children?: React.ReactNode;
}
interface ISearchProps extends FormComponentProps {
  onSearchBtn?: (arg: any) => void;
  onReset?: Function;
}

const Search: React.FunctionComponent<ISearchProps> = ({
  form,
  onSearchBtn,
  onReset,
}) => {
  const fields: IFieldItem[] = useContext(searchFields);
  const { getFieldDecorator, validateFields, resetFields } = form;

  const getFields = () => {
    return fields.reduce((acc, field: IFieldItem, index) => {
      acc.push(
        <Form.Item label={field.field}>
          {getFieldDecorator(field.field, {
            rules: field.rules,
          })(
            field.children ? (
              field.children
            ) : (
              <Input
                style={{ width: 180 }}
                placeholder={field.msg || "placeholder"}
              />
            )
          )}
        </Form.Item>
      );
      return acc;
    }, []);
  };
  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    validateFields((err, values) => {
      onSearchBtn(
        Object.keys(values).reduce((acc, item) => {
          values[item] ? (acc[item] = values[item]) : null;
          return acc;
        }, {})
      );
    });
  };

  const handleReset = () => resetFields();

  return (
    <Form className="Search-wrapper" layout="inline" onSubmit={handleSearch}>
      <Row className="Search-wrapper-content">
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

export default Form.create<ISearchProps>({ name: "advanced_search" })(Search);
