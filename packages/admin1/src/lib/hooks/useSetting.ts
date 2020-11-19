import React, { useEffect, useState } from "react";
import { SettingApi } from "@api";

export const useSetting = () => {
  const [value, setValue] = useState<any>({});

  useEffect(() => {
    SettingApi.getSetting().then((res) => {
      setValue(res);
    });
  }, []);

  return value;
};
