import * as React from 'react';
import ProTable from '@ant-design/pro-table';
import { useCategoryColumns } from './hooks';
import { getCategorys } from '@/services/category';
import { Button, Card, Form, Input } from 'antd';
import AddForm from './index-add';

interface ICategoryProps {}

const Category: React.FunctionComponent<ICategoryProps> = (props) => {
  const {
    actionRef,
    formRef,
    columns,
    timeColumn,
    actionColumn,
    modalVisible,
    category,
    setCategory,
    setModalVisible,
    editor,
  } = useCategoryColumns();

  return (
    <>
      <ProTable<ICategory, ICategory>
        headerTitle="分类列表"
        rowKey="id"
        actionRef={actionRef}
        columns={[...columns, timeColumn, actionColumn]}
        pagination={{
          pageSize: 12,
        }}
        request={({ pageSize, current }) => {
          return getCategorys().then((data) => ({
            data,
          }));
        }}
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => {
              setCategory(undefined);
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
          editor={editor}
          category={category}
          setCategory={setCategory}
          setModalVisible={setModalVisible}
        />
        
      ) : null}
    </>
  );
};

export default Category;
