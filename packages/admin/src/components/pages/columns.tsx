import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSetting } from "@lib/hooks";
import { Badge, Divider, Popconfirm } from "antd";
import dayjs from "dayjs";

const Action = styled.div``;

export function useColumns() {
  const setting = useSetting();

  const deletePage = (id) => {};
  const setVisible = (bol) => {};
  const getViews = (url) => {};
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a
          href={`${setting.systemUrl || ""}/page/${record.path}`}
          target="_blank"
        >
          {text}
        </a>
      ),
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const isDraft = status === "draft";
        return (
          <Badge
            color={isDraft ? "gold" : "green"}
            text={isDraft ? "草稿" : "已发布"}
          />
        );
      },
    },
    {
      title: "阅读量",
      dataIndex: "views",
      key: "views",
      render: (views) => (
        <Badge
          count={views}
          showZero={true}
          overflowCount={Infinity}
          style={{ backgroundColor: "#52c41a" }}
        />
      ),
    },
    {
      title: "发布时间",
      dataIndex: "publishAt",
      key: "publishAt",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    },

    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        const isDraft = record.status === "draft";

        return (
          <Action>
            {isDraft ? <a href="">启动</a> : <a href="">禁用</a>}

            <Divider type="vertical" />

            <Link to={`/editor/page/${record.id}`} target="_blank">
              编辑
            </Link>

            <Divider type="vertical" />
            <span
              onClick={() => {
                setVisible(true);
                getViews(`${setting.systemUrl || ""}/page/${record.path}`);
              }}
            >
              <a>查看访问</a>
            </span>
            <Divider type="vertical" />

            <Popconfirm
              onConfirm={() => deletePage(record.id)}
              title="确认删除这个页面"
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </Action>
        );
      },
    },
  ];

  return columns;
}
