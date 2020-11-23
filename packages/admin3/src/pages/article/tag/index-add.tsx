import * as React from 'react';
import { Modal } from 'antd';

interface IAddFormProps {
  modalVisible: boolean;
  setModalVisible: Function;
}

const AddForm: React.FunctionComponent<IAddFormProps> = ({
  children,
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      visible={modalVisible}
      onCancel={() => {
        setModalVisible(false);
      }}
    >
      {children}
    </Modal>
  );
};

export default AddForm;
