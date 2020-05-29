import { getType } from "typesafe-actions";
import { User } from "../actions";

export interface IUserState {
  user_name: string;
  token: string;
  isLogin: boolean;
}

const initState = {
  user_name: "",
  token: "",
  isLogin: false,
};

export default function userReducer(
  state: IUserState = initState,
  action: any
): IUserState {
  switch (action.type) {
    case getType(User.loginSuccess):
      const { user_name, token } = action.payload;
      return {
        ...state,
        user_name,
        token,
        isLogin: true,
      };
    case getType(User.loginError):
      return {
        ...state,
        user_name: "",
        token: "",
        isLogin: false,
      };
    default:
      return state;
  }
}
