import { ActionsObservable, ofType } from "redux-observable";
import { getType } from "typesafe-actions";
import { switchMap, map } from "rxjs/operators";
import { Option } from "@actions";
import { Option as Option_server } from "@service";

export const otion_list_all = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Option.instance.get_list_all)),
    switchMap(() => {
      return Option_server.get_list_all().pipe(
        map(({ response }) => {
          console.log(response);
          if (response.code == 200) {
            return Option.instance.get_list_all2(response.data);
          }
          return Option.instance.get_list_all1();
        })
      );
    })
  );
};
