import * as React from "react";
import { useLoginStatusInit } from './auth'
interface IAuthProps {}

const Auth: React.FunctionComponent<IAuthProps> = (props) => {
  useLoginStatusInit()
  return <>{props.children}</>;
};

export default Auth;
