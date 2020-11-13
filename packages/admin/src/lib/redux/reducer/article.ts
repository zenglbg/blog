import { ActionArticle } from "@lib/redux/actions";
import { PayloadAction, getType } from "typesafe-actions";


export interface StateInter {
  articles: IArticle[];
  onId: string;
  total: number;
  params: any;
}
const initState = {
  articles: null,
  onId: null,
  total: 0,
  params: null,
};



export function articleReducer(
  state: StateInter = initState,
  action: PayloadAction<string, StateInter>
): StateInter {
  switch (action.type) {
    case getType(ActionArticle.setArticles):
      const { articles, total, params } = action.payload;
      return {
        ...state,
        articles,
        total,
        params
      };
    case getType(ActionArticle.handleId):
      const { onId } = action.payload;
      return {
        ...state,
        onId,
      };
    default:
      return state;
  }
}
