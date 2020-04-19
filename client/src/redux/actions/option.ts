import { createAction } from "typesafe-actions";

export class Option {
  /**
   * 2 success, 1 error;
   */
  public GET_LIST_ALL = "GET_LIST_ALL";
  public GET_LIST_ALL2 = "GET_LIST_ALL2";
  public GET_LIST_ALL1 = "GET_LIST_ALL1";

  public get_list_all = createAction(this.GET_LIST_ALL)();
  public get_list_all2 = createAction(
    this.GET_LIST_ALL2,
    (list_all: any) => /**list_all **/ list_all
  )();
  public get_list_all1 = createAction(this.GET_LIST_ALL1)();

  public static option: Option;
  public static get instance() {
    if (!this.option) this.option = new Option();
    return this.option;
  }
}
