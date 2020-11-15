import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSetting } from "@lib/hooks";
import { Tabs } from "antd";
const Wrapper = styled.div``;
interface ISettingProps {}

const Setting: React.FunctionComponent<ISettingProps> = (props) => {
  const [type, setType] = useState(null);
  const setting = useSetting();
  const tabs = [
    {
      label: "系统设置",
      content: <div>系统设置'</div>,
    },
    {
      label: "SEO 设置",
      content: <div>设置'</div>,
    },
    {
      label: "OSS 设置",
      content: <div>设置'</div>,
    },
    {
      label: "SMTP 服务",
      content: <div>SMTP 服务</div>,
    },
  ];
  return (
    <Wrapper>
      <div>
        {setting.systemTitle}
      </div>
      {setting && (
        <Tabs
          activeKey={type}
          tabPosition={"left"}
          onChange={(key) => {
            setType(key);
            // router.push(`/setting`, `/setting?type=` + key, {
            //   shallow: true,
            // });
          }}
        >
          {tabs.map((tab) => {
            <Tabs.TabPane tab={tab.label}>{tab.content}</Tabs.TabPane>;
          })}
        </Tabs>
      )}
    </Wrapper>
  );
};

export default Setting;
