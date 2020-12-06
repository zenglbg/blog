import React, { useState, useEffect } from 'react';
import { ProColumns } from '@ant-design/pro-table';
import { Badge, Tag, Popconfirm, Divider } from 'antd';
import { Link, useDispatch, history } from 'umi';
import { ArticleAction } from '@/models/article';

export function useManageColumns() {
  const dispatch = useDispatch();
  const handleArticle = (record?: IArticle) => {
    dispatch(ArticleAction.setArticle(record));
  };
  const deleteArticle = (id: string | number) => {};

  const columns: ProColumns<any>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: any, record: any) => <a href="">{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      valueEnum: {
        draft: {
          text: '草稿',
          status: 'draft',
        },
        publish: {
          text: '发布',
          status: 'publish',
        },
      },
      render: (status: any) => {
        const isDraft = status === 'draft';
        return <Badge color={isDraft ? 'gold' : 'green'} text={isDraft ? '草稿' : '已发布'} />;
      },
    },
    {
      title: '分类',
      key: 'category',
      dataIndex: 'category',
      render: (category: any) =>
        category ? (
          <span>
            <Tag color="magenta" key={category.value}>
              {category.label}
            </Tag>
          </span>
        ) : null,
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      copyable: true,
      render: (tags: any) => (
        <span>
          {Array.isArray(tags)
            ? tags.map((tag) => {
                let color = tag.label.length > 2 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag.label}>
                    {tag.label}
                  </Tag>
                );
              })
            : null}
        </span>
      ),
    },
    {
      title: '阅读量',
      dataIndex: 'views',
      key: 'views',
      hideInForm: false,
      search: false,
      renderFormItem: (item, { value, onChange }) => {
        return <div>{value}3232323</div>;
      },
      render: (views: any) => (
        <Badge
          count={views}
          showZero
          overflowCount={Infinity}
          style={{ backgroundColor: '#52c41a' }}
        />
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'publishAt',
      key: 'publishAt',
      valueType: 'dateTime',
      render: (date: any) => date,
    },
    {
      title: '操作',
      key: 'action',
      hideInForm: false,
      search: false,
      render: (_: any, record: any) => (
        <span>
          <Link to="/editor/article" target="__blank" onClick={() => handleArticle(record)}>
            编辑
          </Link>
          <Divider type="vertical" />
          <span />
          <a onClick={() => {}}>
            <span>查看访问</span>
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除这个文章"
            onConfirm={() => deleteArticle(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return { columns, handleArticle };
}
