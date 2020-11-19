import { getType } from "typesafe-actions";
import { ActionUser } from "@actions";

export interface IUserState {
  name: string;
  token: string;
  isLogin: boolean;
  avatar: string;
  email: string;
  id: string;
  role: string;
  status: string;
}

const initState = {
  name: "",
  token: "",
  isLogin: false,
  avatar: "",
  email: "",
  id: "",
  role: "",
  status: "",
};

export default function userReducer(
  state: IUserState = initState,
  action: any
): IUserState {
  switch (action.type) {
    case getType(ActionUser.loginS):
      const { avatar, email, id, name, role, status, token } = action.payload;
      return {
        ...state,
        avatar,
        email,
        id,
        name,
        role,
        status,
        token,
        isLogin: true,
      };
    case getType(ActionUser.loginE):
      return {
        ...state,
        name: "",
        token: "",
        isLogin: false,
      };
    default:
      return state;
  }
}
