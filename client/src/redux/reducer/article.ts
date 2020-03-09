import { getType } from "typesafe-actions";
import { Article } from "../actions";

export interface IArticleState {
  article_list: Array<any>;
  article_list_all: Array<any>;
  list_loading: boolean;
}

const initState = {
  article_list: null,
  article_list_all: null,
  list_loading: false
};

export default function articleReducer(
  state: IArticleState = initState,
  action: any
): IArticleState {
  switch (action.type) {
    case getType(Article.instance.getArticleSuccess):
      return {
        ...state,
        article_list: action.payload.data,
        list_loading: false
      };
    case getType(Article.instance.getArticleError):
      return {
        ...state,
        list_loading: false
      };
    case getType(Article.instance.getArticleStatus):
      return {
        ...state,
        list_loading: action.payload.list_loading
      };
    default:
      return state;
  }
}
