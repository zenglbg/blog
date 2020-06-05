import React, { useContext, SyntheticEvent } from "react";
import { Form, Row, Input, Button, Col } from "antd";
import { FormComponentProps } from "antd/es/form";
import { searchFields } from "../../components/user";

interface IFieldItem {
  label: React.ReactNode;
  field: string;
  rules?: Array<any>;
  msg?: string;
  children?: React.ReactNode;
}
interface ISearchProps extends FormComponentProps {
  onSearch?: Function;
  onReset?: Function;
}

const Search: React.FunctionComponent<ISearchProps> = ({
  form,
  onSearch,
  onReset,
}) => {
  const fields: IFieldItem[] = useContext(searchFields);
  const { getFieldDecorator, validateFields } = form;

  const getFields = () => {
    return fields.reduce((acc, field: IFieldItem, index) => {
      acc.push(
        getFieldDecorator(field.field)(
          <div className="ant-row ant-form-item" key={field.field}>
            <Form.Item htmlFor={field.field}>
              {field.children ? (
                field.children
              ) : (
                <Input
                  style={{ width: 180 }}
                  placeholder={field.msg || "placeholder"}
                />
              )}
            </Form.Item>
          </div>
        )
      );
      return acc;
    }, []);
  };
  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    validateFields((err, values) => {
      onSearch(values);
    });
  };

  const handleReset = () => {};

  return (
    <Form className="Search-wrapper" layout="inline" onSubmit={handleSearch}>
      <Row className="Search-wrapper-content">
        {getFields()}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            搜索
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default Form.create({ name: "advanced_search" })(Search);
