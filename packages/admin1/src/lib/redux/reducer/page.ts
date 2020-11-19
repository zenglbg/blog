import { ActionPage } from "@actions";
import { PayloadAction, getType } from "typesafe-actions";

export interface StateInter {
  pages: IPage[] | null;
  page: IPage | null;
  total: number;
}
const initState = {
  pages: null,
  page: null,
  total: 0,
};

export function pageReducer(
  state: StateInter = initState,
  action: PayloadAction<string, StateInter>
): StateInter {
  switch (action.type) {
    case getType(ActionPage.setpage):
      const { pages, total } = action.payload;
      return {
        ...state,
        pages,
        total,
      };
    case getType(ActionPage.handleId):
      const { page } = action.payload;
      return {
        ...state,
        page,
      };
    default:
      return state;
  }
}
