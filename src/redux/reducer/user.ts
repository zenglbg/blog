import { getType } from "typesafe-actions";
import { UserAction, userActions } from "./../actions";

export interface IUserState {
  name: string;
  avatar_url: string;
}

const initState = {
  name: "",
  avatar_url: ""
};

export default function userReducer(
  state: IUserState = initState,
  action: UserAction
): IUserState {
  switch (action.type) {
    case getType(userActions.setLogin):
      const { name, avatar_url } = action.payload;
      return {
        ...state,
        name,
        avatar_url
      };
    default:
      return state;
  }
}
