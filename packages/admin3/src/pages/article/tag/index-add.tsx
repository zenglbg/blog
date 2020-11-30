import React from 'react';
import { Modal, Card, Form, Input } from 'antd';
interface IAddFormProps {
  modalVisible: boolean;
  tag: ITag;
  setModalVisible: Function;
  setTag: Function;
  editor: Function;
}

const AddForm: React.FunctionComponent<IAddFormProps> = ({
  modalVisible,
  tag,
  setTag,
  setModalVisible,
  editor,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={modalVisible}
      onCancel={() => {
        setTag();
        setModalVisible(false);
      }}
      onOk={() => {
        editor(form.getFieldsValue());
      }}
    >
      <Card title="编辑标签">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} initialValues={tag}>
          <Form.Item label="标签名" name="label">
            <Input />
          </Form.Item>
          <Form.Item label="标签值" name="value">
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default AddForm;
