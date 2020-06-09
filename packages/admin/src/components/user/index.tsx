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
import { IState } from "@reducer/index";
import { Usersr } from "@service/index";
import SPTDataTable from "../../common/SPTDataTable";
import { map } from "rxjs/operators";

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
  const [data, setData] = useState<Array<Pick<IState, "user">>>([]);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState(null);

  const getData = useCallback((params) => {
    return Usersr.getUsers(params).pipe(
      map((res) => {
        if (res.status === 200 && res.data.success) {
          setData(res.data.data[0]);
          setTotal(res.data.data[1]);
        }
        return res;
      })
    );
  }, []);
  const updateUser = useCallback(
    (user) => {
      return Usersr.update(user).subscribe(() => {
        message.success("操作成功");
        getData(params).subscribe(() => console.log(`更新数据成功`));
      });
    },
    [params]
  );

  useEffect(() => {});

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
