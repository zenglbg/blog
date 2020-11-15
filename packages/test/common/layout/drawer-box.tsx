import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import styled from "styled-components";
const Wrapper = styled.div`
  position: fixed;
  top: 68px;
  right: 0;
  height: 100vh;
`;

interface IDrawerBoxProps {}

const DrawerBox: React.FunctionComponent<IDrawerBoxProps> = (props) => {
  const [visible, setVisible] = useState(true);

  return (
    <Wrapper>
      <Drawer
        title=""
        width={420}
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        getContainer={false}
        style={{
          position: "absolute",
        }}
      >
        <p>Some contents...</p>
      </Drawer>
    </Wrapper>
  );
};

export default DrawerBox;
