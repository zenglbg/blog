import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { IState } from "@reducer/index";
import { User } from "@actions/index";

interface Props {
  user: any;
  profiles: Function;
}
interface State {
  collapsed: string;
}

@(connect(
  ({ user }: IState) => ({
    user,
  }),
  {
    profiles: User.profiles,
  }
) as any)
export default class index extends Component<
  Props & RouteComponentProps,
  State
> {
  state = {
    collapsed: "",
  };
  componentDidMount() {
    this.props.profiles();
  }

  handleClick = () => {
    this.props.history.push("/admin/login");
  };
  render() {
    return (
      <div>
        <h3 onClick={this.handleClick}>i'm content</h3>
      </div>
    );
  }
}
