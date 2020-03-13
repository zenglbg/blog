import { getType } from "typesafe-actions";
import { Star } from "@actions";

interface TagState {
  star_list: Array<any>;
  star_list_all: Array<any>;
}

const initState = {
  star_list: null,
  star_list_all: null
};

export default function star(
  state: TagState = initState,
  action: {
    type: string;
    payload: any;
  }
): TagState {
  switch (action.type) {
    case getType(Star.instance.getStarAllSuccess):
      const { star_list_all = null } = action.payload;
      return { ...state, star_list_all };
    default:
      return state;
  }
}
