import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { IState } from "@reducer/index";
import { User } from "@actions/user";

interface Props {
  user: any;
  profiles: Function;
}

const Home: React.FunctionComponent<Props & RouteComponentProps> = ({
  history,
  profiles,
}) => {
  const [collapsed, setCollapsed] = useState("");

  useEffect(() => {
    profiles();
  });

  const handleClick = () => {
    history.push("/login");
  };
  return (
    <div>
      <h3 onClick={handleClick}>i'm content</h3>
    </div>
  );
};

export default connect(
  ({ user }: IState) => ({
    user,
  }),
  {
    profiles: User.profiles,
  }
)(Home);
