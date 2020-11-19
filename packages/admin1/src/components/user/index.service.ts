import { useEffect, useState } from "react";
import { UserApi } from "src/lib/api/index";
import { map, withLatestFrom, switchMap, tap } from "rxjs/operators";
import { message } from "antd";
import { useObservableState } from "observable-hooks";

function useGetData() {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState(null);

  const getData = function (params) {
    setParams(params);
    UserApi.getUsers(params).then(([data, total]) => {
      setData(data);
      setTotal(total);
      console.log(data);
    });
  };

  const updateUser = (user) => {
    return UserApi.update(user).then(() => {
      message.success("操作成功");
      getData(params);
    });
  };

  return { data, total, getData, updateUser };
}

export { useGetData };
