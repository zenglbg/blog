import * as React from "react";
import styled from "styled-components";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const Wrapper = styled(Layout)``;

interface ILayoutProps {
  routes: any;
  routesRenderMsp: any;
}
const index: React.FunctionComponent<ILayoutProps> = (props) => {
  const { routesRenderMsp, routes } = props as any;
  return (
    <Wrapper>
      <Sider>Sider</Sider>
      <Layout>
        <Header></Header>
        <Content>{routes ? routesRenderMsp(routes) : props.children}</Content>
        <Footer></Footer>
      </Layout>
    </Wrapper>
  );
};

export default index;
