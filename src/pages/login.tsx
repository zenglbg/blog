import React, { Component } from "react";
import { connect } from "react-redux";
import Particles from "reactparticles.js";
import { Form, Icon, Input, Button, Card, message } from "antd";
interface Props {}
interface State {}

export class Login extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="login">
        {/* <Particles
          id="config-1"
          config="particles/config-1.json"
          style={{
            width: "50%",
            height: "50%",
            backgroundColor: "green",
            opacity: "0.5"
          }}
          className="particles-class-name"
        /> */}
        <Card className="login-item">
          <Form>
            <Form.Item>
              <Input placeholder="请输入用户名"></Input>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
