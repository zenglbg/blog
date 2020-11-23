import React, { useState, useEffect, useRef } from 'react';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Badge, Tag, Popconfirm, Divider } from 'antd';
import { delTag, updateTag, addTag } from '@/services/tag';

export function useTagColumns(
  reloadAndRest: Function,
  setModalVisible: Function,
  setTag: Function,
) {
  const columns: ProColumns<any>[] = [
    {
      title: '标签',
      key: 'label',
      dataIndex: 'label',
      copyable: true,
      render: (_, tag: ITag) => {
        let color = tag.label && tag.label.length > 2 ? 'geekblue' : 'green';
        if (tag) {
          color = 'volcano';
        }
        return (
          <span>
            <Tag color={color} key={tag.label}>
              {tag.label}
            </Tag>
          </span>
        );
      },
    },
    {
      title: '标签值',
      key: 'value',
      dataIndex: 'value',
      copyable: true,
      render: (_, tag: ITag) => {
        let color = tag.value.length > 2 ? 'geekblue' : 'green';
        if (tag) {
          color = 'volcano';
        }
        return (
          <span>
            <Tag color={color} key={tag.value}>
              {tag.value}
            </Tag>
          </span>
        );
      },
    },
  ];

  const timeColumn: ProColumns<any> = {
    title: '更新时间',
    dataIndex: 'updateAt',
    key: 'updateAt',
    valueType: 'dateTime',
    render: (date: any) => date,
  };
  const actionColumn: ProColumns<any> = {
    title: '操作',
    key: 'action',
    hideInForm: false,
    search: false,
    render: (_: any, record: any) => (
      <span>
        <a onClick={() => doTag(record)}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm
          title="确认删除这个分类"
          onConfirm={() => deleteTag(record.id)}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  };

  const doTag = (category: ITag) => {
    setTag(category);
    setModalVisible(true);
  };

  const deleteTag= (id: string) => {
    /**
     * @todo
     * server 删除有问题待处理 */
    delTag(id);
    reloadAndRest();
  };

  return { columns, timeColumn, actionColumn };
}
export function useAction() {
  const actionRef = useRef<ActionType>();

  const reload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  const reloadAndRest = () => {
    if (actionRef.current) {
      actionRef.current?.reloadAndRest?.();
    }
  };
  return { actionRef, reload, reloadAndRest };
}
export function useAddTag(reloadAndRest: Function) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tag, _setTag] = useState<ITag>();

  const setTag = (data: any) => {
    _setTag(data);
  };

  const editor = (value: ITag) => {
    if (tag) {
      updateTag(tag.id, value).then((res) => {
        setModalVisible(false);
        reloadAndRest();
      });
      return;
    }
    addTag(value).then((res) => {
      setModalVisible(false);
      reloadAndRest();
    });
  };

  return {
    modalVisible,
    setModalVisible,
    tag,
    setTag,
    editor,
  };
}
