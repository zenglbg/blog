import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, ActionSetting, ActionFile } from 'umi';
import { ConnectState } from '@/models/connect';

export const useGetdata = () => {
  const dispatch = useDispatch();
  const { files = [] } = useSelector<ConnectState, any>((state) => state.file);
  const { userSetting = {} } = useSelector<ConnectState, any>((state) => state.settings);
  const [changefn, setChangefn] = useState<'systemLogo' | 'systemFavico' | 'wechat' | 'alipay'>(
    'systemLogo',
  );

  useEffect(() => {
    dispatch(ActionSetting.getSetting({}));
  }, []);

  const finish = (values: any) => {
    dispatch(ActionSetting.upSetting(values));
    return Promise.resolve();
  };

  const selectFile = useCallback(
    (key: 'systemLogo' | 'systemFavico' | 'wechat' | 'alipay', value: string) => {
      dispatch(
        ActionSetting.setAloneSetting({
          [key]: value,
        }),
      );
    },
    [],
  );

  return { files, userSetting, changefn, finish, setChangefn, selectFile };
};
