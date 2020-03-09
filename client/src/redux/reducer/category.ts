import { getType } from "typesafe-actions";
import { Category } from "@actions";

interface CategoryState {
  category_list: Array<any>;
  category_list_all: Array<any>;
}

const initState = {
  category_list: null,
  category_list_all: null
};

export default function category(
  state: CategoryState = initState,
  action: {
    type: string;
    payload: any;
  }
): CategoryState {
  switch (action.type) {
    case getType(Category.instance.getCategoryAllSuccess):
      const { category_list_all = null } = action.payload;
      return { ...state, category_list_all };
    default:
      return state;
  }
}
