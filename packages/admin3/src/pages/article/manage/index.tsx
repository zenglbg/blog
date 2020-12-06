import React, { useState, useEffect } from 'react';

import ProTable from '@ant-design/pro-table';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { useManageColumns } from './hooks';
import { getArticles } from '@/services/article';
import { history, Link } from 'umi';
interface IManageProps {}

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
const Manage: React.FunctionComponent<IManageProps> = (props) => {
  const { columns, handleArticle } = useManageColumns();

  return (
    <ProTable
      headerTitle="文章管理"
      columns={columns}
      pagination={{
        pageSize: 12,
      }}
      rowKey="id"
      request={({ pageSize, current, keyword, ...params }) => {
        return getArticles({
          pageSize,
          page: current,
        });
      }}
      toolBarRender={() => [
        <a key="btn" onClick={() => handleArticle()}>
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>
        </a>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default Manage;
