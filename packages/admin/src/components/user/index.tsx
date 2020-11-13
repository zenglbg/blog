import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import * as dayjs from "dayjs";
import { Select, Badge, Divider, message } from "antd";
import { connect } from "react-redux";
import { IState } from "@lib/redux/reducer/index";
import { Usersr } from "src/lib/api/user";
import SPTDataTable from "../../common/SPTDataTable";
import { from } from "rxjs";
import {
  combineLatest,
  map,
  switchMap,
  withLatestFrom,
  tap,
  pairwise,
  mapTo,
} from "rxjs/operators";

import { useEventCallback, useObservable } from "rxjs-hooks";
import { useObservableState } from "observable-hooks";
import { useGetData } from "./index.service";

const fields = [
  {
    label: "账户",
    field: "name",
    msg: "请输入用户账户",
  },
  {
    label: "邮箱",
    field: "email",
    msg: "请输入账户邮箱",
  },
  {
    label: "状态",
    field: "status",
    children: (
      <Select style={{ width: 180 }}>
        {[
          { label: "锁定", value: "locked" },
          { label: "可用", value: "active" },
        ].map((t) => {
          return (
            <Select.Option key={t.label} value={t.value}>
              {t.label}
            </Select.Option>
          );
        })}
      </Select>
    ),
  },
];
const columns = [
  {
    title: "账户",
    dataIndex: "name",
    width: "10%",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    width: "20%",
  },
  {
    title: "角色",
    dataIndex: "role",
    render: (role) => {
      return role === "admin" ? "管理员" : "访客";
    },
  },
  {
    title: "状态",
    dataIndex: "status",
    render: (status) => {
      const isLocked = status === "locked";
      return (
        <Badge
          color={isLocked ? "gold" : "green"}
          text={isLocked ? "已锁定" : "可用"}
        />
      );
    },
  },
  {
    title: "注册日期",
    dataIndex: "createAt",
    render: (date) => dayjs.default(date).format("YYYY-MM-DD HH:mm:ss"),
  },
];

export const searchFields = createContext(fields);

interface IUserProps {}

const User: React.FunctionComponent<IUserProps> = (props) => {
  const { data, total, getData, updateUser } = useGetData();

  const actionColumns = {
    title: "操作",
    key: "action",
    render: (_, record) => {
      const isLocked = record.status === "locked";
      const isAdmin = record.role === "admin";
      return (
        <span>
          {isLocked ? (
            <a onClick={() => updateUser({ ...record, status: "active" })}>
              启用
            </a>
          ) : (
            <a onClick={() => updateUser({ ...record, status: "locked" })}>
              禁用
            </a>
          )}
          <Divider type="vertical" />
          {isAdmin ? (
            <a onClick={() => updateUser({ ...record, role: "visitor" })}>
              解除授权
            </a>
          ) : (
            <a onClick={() => updateUser({ ...record, role: "admin" })}>授权</a>
          )}
        </span>
      );
    },
  };

  return (
    <div className="user-wrapper">
      <searchFields.Provider value={fields}>
        <SPTDataTable
          data={data}
          total={total}
          columns={[...columns, actionColumns]}
          onSearch={getData}
        />
      </searchFields.Provider>
    </div>
  );
};

export default connect(({ user }: IState) => ({
  user,
}))(User);
