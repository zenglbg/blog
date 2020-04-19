import { PayloadAction, getType } from "typesafe-actions";
import { Option } from "@actions";
export interface OptionI {
  list_all: Array<any>;
}

export const option_state: OptionI = {
  list_all: null,
};

export default function option(
  state: OptionI = option_state,
  action: PayloadAction<string, any>
): OptionI {
  switch (action.type) {
    case getType(Option.instance.get_list_all2):
      return {
        ...state,
        list_all: action.payload,
      };
    default:
      return state;
  }
}
