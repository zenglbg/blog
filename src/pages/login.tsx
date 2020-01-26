import React, { Component } from "react";
import { connect } from "react-redux";
import Particles from "reactparticles.js";
import { Form, Icon, Input, Button, Card, message } from "antd";
import { IState } from "../redux/reducer";
import { userActions } from "../redux/actions";

type PageStateProps = Pick<IState, "user">;

type PageDispatchProps = {
  doLogin: (obj: any) => void;
};

interface Props {}
interface State {}

type IProps = PageDispatchProps & Props;

export class Login extends Component<IProps, State> {
  state = {};

  doLogin = () => {
    this.props.doLogin({ name: "", avatar_url: "123" });
  };

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

const mapDispatchToProps = {
  doLogin: userActions.doLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
