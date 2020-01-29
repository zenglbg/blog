import { getType } from "typesafe-actions";
import { UserAction, userActions } from "./../actions";
import { USER } from "../constants";

export interface IUserState {
  user: string;
  passwd: string;
}

const initState = {
  user: "",
  passwd: ""
};

export default function userReducer(
  state: IUserState = initState,
  action: UserAction
): IUserState {
  switch (action.type) {
    case getType(userActions.loginSuccess):
      console.log("reducer_set_login");
      return {
        ...state,
        user: "123",
        passwd: "12222"
      };
    default:
      return state;
  }
}
