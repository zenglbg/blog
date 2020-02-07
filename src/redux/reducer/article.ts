import { getType } from "typesafe-actions";
import { ArticleAction, articleActions } from "./../actions";

export interface IArticleState {
  user: string;
  passwd: string;
  isLogin: boolean;
}

const initState = {
  user: "",
  passwd: "",
  isLogin: false
};

export default function articleReducer(
  state: IArticleState = initState,
  action: ArticleAction
): IArticleState {
  switch (action.type) {
    case getType(articleActions.getArticleSuccess):
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
