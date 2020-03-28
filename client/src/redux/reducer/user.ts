import { getType } from "typesafe-actions";
import { User } from "../actions";

export interface IUserState {
  user: string;
  passwd: string;
  isLogin: boolean;
}

const initState = {
  user: "",
  passwd: "",
  isLogin: false
};

export default function userReducer(
  state: IUserState = initState,
  action: any
): IUserState {
  switch (action.type) {
    case getType(User.instance.loginSuccess):
      const { user, passwd } = action.payload;
      return {
        ...state,
        user,
        passwd,
        isLogin: true
      };
    case getType(User.instance.loginError):
      return {
        ...state,
        user: "",
        passwd: "",
        isLogin: false
      };
    default:
      return state;
  }
}
