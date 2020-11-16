import { Drawer, Input } from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SearchOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  position: fixed;
  right: 6rem;
  top: 1.7rem;
  z-index: 2;
  transform: translateY(-50%);
`;

interface IHeaderInputProps {
  onSearch: Function;
}

const HeaderInput: React.FunctionComponent<IHeaderInputProps> = ({
  onSearch,
}) => {
  return (
    <Wrapper>
      <Input
        placeholder="Search here..."
        size="large"
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => onSearch(e.target.value)}
      />
    </Wrapper>
  );
};

export default HeaderInput;
