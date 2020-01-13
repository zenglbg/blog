import * as React from "react";
import { Button, Layout, Menu, Icon, Avatar, Dropdown, DatePicker } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import "./index.css";

export interface ILoginProps {}

export default class Login extends React.Component<ILoginProps> {
  public render() {
    return (
      <div>
        <Layout style={{minHeight: '100vh'}}>
          <Sider>Sider</Sider>
          <h1>antd version: 111</h1>
          <DatePicker />
          <Button type="primary" style={{ marginLeft: 8 }}>
            Primary Button
          </Button>
          <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
