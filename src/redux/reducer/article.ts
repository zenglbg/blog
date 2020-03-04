import { getType } from "typesafe-actions";
import { ArticleAction, articleActions } from "./../actions";

export interface IArticleState {
  article_list: null;
  list_loading: boolean;
}

const initState = {
  article_list: null,
  list_loading: false
};

export default function articleReducer(
  state: IArticleState = initState,
  action: ArticleAction
): IArticleState {
  switch (action.type) {
    case getType(articleActions.getArticleSuccess):
      return {
        ...state,
        article_list: action.payload.data,
        list_loading: false
      };
    case getType(articleActions.getArticleError):
      return {
        ...state,
        list_loading: false
      };
    case getType(articleActions.get_article_status):
      return {
        ...state,
        list_loading: action.payload.list_loading
      };
    default:
      return state;
  }
}
