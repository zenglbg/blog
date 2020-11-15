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

interface IHeaderInputProps {}

const HeaderInput: React.FunctionComponent<IHeaderInputProps> = (props) => {
  const [articles, setArticles] = useState<IArticle[] | null>([]);
  const [keyword, setKeyword] = useState("");

  return (
    <Wrapper>
      <Input
        placeholder="Search here..."
        size="large"
        prefix={<SearchOutlined />}
        allowClear
      />
    </Wrapper>
  );
};

export default HeaderInput;
