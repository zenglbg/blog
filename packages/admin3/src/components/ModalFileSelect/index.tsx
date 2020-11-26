import React, { useEffect, useCallback } from 'react';
import { Modal, Form, Upload, Button, Table, message, List, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from '@/services/file';
import { UploadProps } from 'antd/lib/upload';
import { ActionFile, Dispatch, useDispatch, useSelector } from 'umi';
import styles from './style.less';

interface IModalFileSelectProps {
  files: any;
  fileVisible: boolean;
  setFileVisible: Function;
  changefn: string;
  selectFile: Function;
}
const ModalFileSelect: React.FunctionComponent<IModalFileSelectProps> = ({
  files = [],
  fileVisible,
  setFileVisible,
  changefn,
  selectFile,
}) => {
  const dispatch = useDispatch();
  /**
   * @todo 通过modal 上传文件，并刷新表格选取文件url，上传配置保存～
   */
  const uploadProps: UploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    action: '',
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        uploadFile(file).then(
          (res) => {
            if (res.statusCode === 400) {
              reject();
            } else {
              getfiles();
              resolve();
            }
          },
          (err) => {
            reject(err);
          },
        );
      });
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const getfiles = useCallback(() => {
    dispatch(ActionFile.getFiles({}));
  }, []);

  const setFile = useCallback((file) => {
    selectFile(changefn, file.url);
    setFileVisible(false);
  }, [changefn]);

  useEffect(() => {
    getfiles();
  }, []);

  return (
    <Modal
      title="文件选取"
      visible={fileVisible}
      onCancel={() => setFileVisible(false)}
      width={1000}
    >
      <Form>
        <Form.Item>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>upload file</Button>
          </Upload>
        </Form.Item>
      </Form>
      <List
        grid={{
          gutter: 16,
          sm: 3,
        }}
        dataSource={files}
        rowKey="id"
        renderItem={(file: IFile) => {
          return (
            <List.Item onClick={() => setFile(file)}>
              <Card
                cover={
                  <div className={styles.preview}>
                    <img src={file.url} alt={file.originalname} />
                  </div>
                }
              >
                <List.Item.Meta title={file.originalname} />
              </Card>
            </List.Item>
          );
        }}
      />
      {/* <Table
        columns={[
          {
            title: '源文件名',
            dataIndex: 'originalname',
          },
          {
            title: '文件类型',
            dataIndex: 'type',
          },
          {
            title: '文件地址',
            dataIndex: 'url',
          },
          {
            title: '操作',
            render: (_, record) => {
              return <Button onClick={() => setFile(record)}>选择</Button>;
            },
          },
        ]}
        rowKey="id"
        dataSource={files}
      /> */}
    </Modal>
  );
};

export default ModalFileSelect;
