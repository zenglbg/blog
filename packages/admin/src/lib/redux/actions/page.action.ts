import { createAction } from "typesafe-actions";

export class ActionPage {
  public static SET_PAGE = "SET_PAGE";
  public static GET_PAGE = "GET_PAGE";
  public static HANDLE_PAGE = "HANDLE_PAGE";

  /**请求页面 */
  public static getpage = createAction(
    ActionPage.GET_PAGE,
    (params) => params
  )();

  /**
   * 获取页面数据
   */
  public static setpage = createAction(
    ActionPage.SET_PAGE,
    (data) => data
  )();

  /**
   * 被选中的页面
   */
  public static handleId = createAction(ActionPage.HANDLE_PAGE, (page) => ({
    page,
  }))();
}
