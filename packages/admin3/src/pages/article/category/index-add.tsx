import React from 'react';
import { Modal, Card, Form, Input } from 'antd';
interface IAddFormProps {
  modalVisible: boolean;
  category: ICategory;
  setModalVisible: Function;
  setCategory: Function;
  editor: Function;
}

const AddForm: React.FunctionComponent<IAddFormProps> = ({
  modalVisible,
  category,
  setCategory,
  setModalVisible,
  editor,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={modalVisible}
      onCancel={() => {
        setCategory();
        setModalVisible(false);
      }}
      onOk={() => {
        editor(form.getFieldsValue());
      }}
    >
      <Card title="编辑分类">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} initialValues={category}>
          <Form.Item label="分类名" name="label">
            <Input />
          </Form.Item>
          <Form.Item label="分类值" name="value">
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default AddForm;
