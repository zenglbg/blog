import React, { useContext, createContext, useEffect, useState } from "react";
import * as dayjs from "dayjs";
import { Select, Badge } from "antd";
import { IState } from "@reducer/index";
import SPTDataTable from "../../common/SPTDataTable";
import { Usersr } from "@service/index";
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
    key: "name",
    width: "10%",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "mail",
    width: "20%",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
    render: (role) => {
      return role === "admin" ? "管理员" : "访客";
    },
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
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
    key: "createAt",
    render: (date) => dayjs.default(date).format("YYYY-MM-DD HH:mm:ss"),
  },
];

export const searchFields = createContext(fields);

interface IUserProps {}

const User: React.FunctionComponent<IUserProps> = (props) => {
  const [data, setData] = useState<Array<Pick<IState, "user">>>([]);

  const getData = () => {
    Usersr.getUsers();
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="user-wrapper">
      <searchFields.Provider value={fields}>
        <SPTDataTable
          data={data}
          defaultTotal={0}
          columns={[...columns]}
          onSearch={getData}
        />
      </searchFields.Provider>
    </div>
  );
};

export default User;
