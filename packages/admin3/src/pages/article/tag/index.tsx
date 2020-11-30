import * as React from 'react';
import ProTable from '@ant-design/pro-table';
import { useTagColumns } from './hooks';
import { Button } from 'antd';
import AddForm from './index-add';
import { getTags } from '@/services/tag';

interface ITagProps {}

const Tag: React.FunctionComponent<ITagProps> = (props) => {
  const {
    actionRef,
    modalVisible,
    columns,
    timeColumn,
    actionColumn,
    tag,
    setTag,
    setModalVisible,
    editor,
  } = useTagColumns();
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
      {modalVisible ? (
        <AddForm
          modalVisible={modalVisible}
          tag={tag}
          setModalVisible={setModalVisible}
          editor={editor}
          setTag={setTag}
        />
      ) : null}
    </>
  );
};

export default Tag;
