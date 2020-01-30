import { getType } from "typesafe-actions";
import { UserAction, userActions } from "./../actions";
import { USER } from "../constants";

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
  action: UserAction
): IUserState {
  switch (action.type) {
    case getType(userActions.loginSuccess):
      return {
        ...state,
        user: "123",
        passwd: "12222",
        isLogin: true
      };
    case getType(userActions.loginError):
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
