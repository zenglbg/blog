import { getType } from "typesafe-actions";
import { ActionUser } from "@actions";

export interface IUserState {
  user: IUser,
  isLogin: boolean
}

const initState = {
  user: null,
  isLogin: false
};

export default function userReducer(
  state: IUserState = initState,
  action: any
): IUserState {
  switch (action.type) {
    case getType(ActionUser.loginS):
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    case getType(ActionUser.loginE):
      return {
        ...state,
        user: null,
        isLogin: false,
      };
    default:
      return state;
  }
}
