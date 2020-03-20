import { getType } from "typesafe-actions";
import { Article } from "../actions";

export interface IArticleState {
  article_list: Array<any>;
  article_list_all: Array<any>;
  article_item: any;
  list_loading: boolean;
}

const initState = {
  article_list: null,
  article_list_all: null,
  article_item: null,
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
        article_list: action.payload,
        list_loading: false
      };
    case getType(Article.instance.getArticleListAllSuccess):
      return {
        ...state,
        article_list_all: action.payload,
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
    case getType(Article.instance.getArticleItemSuccess):
      const { article_item } = action.payload;
      return {
        ...state,
        article_item
      };
    default:
      return state;
  }
}
