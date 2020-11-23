import * as React from 'react';
import ProTable from '@ant-design/pro-table';
import { useCategoryColumns, useAddCategory, useAction } from './hooks';
import { getCategorys } from '@/services/category';
import { Button } from 'antd';
import AddForm from './index-add';

interface ICategoryProps {}

const Category: React.FunctionComponent<ICategoryProps> = (props) => {
  const { actionRef, reloadAndRest } = useAction();
  const { modalVisible, setModalVisible, category, setCategory, editor } = useAddCategory(
    reloadAndRest,
  );
  const { columns, timeColumn, actionColumn } = useCategoryColumns(
    reloadAndRest,
    setModalVisible,
    setCategory,
  );
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

      <AddForm modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <ProTable<ICategory, ICategory>
          onSubmit={(value) => {
            editor(value);
          }}
          rowKey="key"
          type="form"
          form={{
            initialValues: category,
          }}
          columns={columns}
        />
      </AddForm>
    </>
  );
};

export default Category;
