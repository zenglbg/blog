import React, { useEffect, useState } from "react";
import { SettingApi } from "@lib/api";

export const useSetting = () => {
  const [value, setValue] = useState<any>({});

  useEffect(() => {
    SettingApi.getSetting().subscribe((res) => {
      if (res.success) {
        setValue(res.data);
      }
    });
  }, []);

  return value;
};
