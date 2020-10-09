import { ActionArticle } from "@actions/index";
import { PayloadAction, getType } from "typesafe-actions";


export interface StateInter {
  articles: IArticle[];
  onArticle: number;
  total: number;
  params: any;
}
const initState = {
  articles: null,
  onArticle: 0,
  total: 0,
  params: null,
};



export function articleReducer(
  state: StateInter = initState,
  action: PayloadAction<string, StateInter>
): StateInter {
  switch (action.type) {
    case getType(ActionArticle.getArticles):
      const { articles, total } = action.payload;
      return {
        ...state,
        articles,
        total,
      };
    case getType(ActionArticle.onArticle):
      const { onArticle } = action.payload;
      return {
        ...state,
        onArticle,
      };
    default:
      return state;
  }
}
