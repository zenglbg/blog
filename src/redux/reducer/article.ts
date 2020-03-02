import { getType } from "typesafe-actions";
import { ArticleAction, articleActions } from "./../actions";

export interface IArticleState {
  article_list: null;
}

const initState = {
  article_list: null
};

export default function articleReducer(
  state: IArticleState = initState,
  action: ArticleAction
): IArticleState {
  switch (action.type) {
    case getType(articleActions.getArticleSuccess):
      return {
        ...state,
        article_list: action.payload.data
      };
    default:
      return state;
  }
}
