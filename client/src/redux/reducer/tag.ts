import { getType } from "typesafe-actions";
import { Tags } from "@actions";

interface TagState {
  tag_list: Array<any>;
  tag_list_all: Array<any>;
}

const initState = {
  tag_list: null,
  tag_list_all: null
};

export default function tag(
  state: TagState = initState,
  action: {
    type: string;
    payload: any;
  }
): TagState {
  switch (action.type) {
    case getType(Tags.instance.getTagAllSuccess):
      const { tag_list_all = null } = action.payload;
      return { ...state, tag_list_all };
    default:
      return state;
  }
}
