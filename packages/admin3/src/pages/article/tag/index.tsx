import * as React from 'react';
import ProTable from '@ant-design/pro-table';
import { useTagColumns, useAddTag, useAction } from './hooks';
import { Button } from 'antd';
import AddForm from './index-add';
import { getTags } from '@/services/tag';

interface ITagProps {}

const Tag: React.FunctionComponent<ITagProps> = (props) => {
  const { actionRef, reloadAndRest } = useAction();
  const { modalVisible, setModalVisible, tag, setTag, editor } = useAddTag(reloadAndRest);
  const { columns, timeColumn, actionColumn } = useTagColumns(
    reloadAndRest,
    setModalVisible,
    setTag,
  );
  return (
    <>
      <ProTable<ITag, ITag>
        headerTitle="分类列表"
        rowKey="id"
        actionRef={actionRef}
        columns={[...columns, timeColumn, actionColumn]}
        pagination={{
          pageSize: 12,
        }}
        request={({ pageSize, current }) => {
          return getTags({
            pageSize,
            page: current,
          }).then((data) => ({
            data,
          }));
        }}
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => {
              setTag(undefined);
              setModalVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
      />

      <AddForm modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <ProTable<ITag, ITag>
          onSubmit={(value) => {
            editor(value);
          }}
          rowKey="key"
          type="form"
          form={{
            initialValues: tag,
          }}
          columns={columns}
        />
      </AddForm>
    </>
  );
};

export default Tag;
