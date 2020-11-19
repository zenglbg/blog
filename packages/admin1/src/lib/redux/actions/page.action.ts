import { createAction } from "typesafe-actions";

export class ActionPage {
  /**请求页面 */
  public static getpage = createAction("GET_PAGE", (params) => params)();

  /**
   * 获取页面数据
   */
  public static setpage = createAction(
    "SET_PAGE",
    (data: { pages: IPage[]; total: number }) => data
  )();

  public static addPage = createAction("ADD_PAGE", (page: IPage) => page)();

  /**
   * 被选中的页面
   */
  public static handleId = createAction("HANDLE_PAGE", (page) => ({
    page,
  }))();
}
