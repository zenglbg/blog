import { createAction, ActionType } from "typesafe-actions";

export type starType = ActionType<typeof Star.instance>;

export class Star {
  public get_star: string = "GET_STAR";
  public get_star_all: string = "GET_STAR_ALL";
  public get_star_all_success: string = "GET_STAR_ALL_SUCCESS";
  public get_star_all_error: string = "GET_STAR_ALL_ERROR";

  public create_star = "CREATE_STAR";
  public create_star_success = "CREATE_STAR_SUCCESS";
  public create_star_err = "CREATE_STAR_ERR";

  public del_star = "DEL_STAR";
  public del_star_err = "DEL_STAR_ERR";

  public static article: Star;

  public static get instance() {
    if (!this.article) {
      this.article = new Star();
    }
    return this.article;
  }

  public getStar = createAction(
    this.get_star,
    (params: { name: string; pageNo: number; pageSize: number }) => params
  )();
  public getStarAll = createAction(this.get_star_all)();
  public getStarAllSuccess = createAction(
    this.get_star_all_success,
    star_list_all => star_list_all
  )();
  public getStarAllError = createAction(this.get_star_all_error)();

  public createStar = createAction(
    this.create_star,
    (star: { title: string; url: string }) => star
  )();
  public createStarSuccess = createAction(this.create_star_success)();
  public createStarErr = createAction(this.create_star_err, msg => msg)();

  public delStar = createAction(this.del_star, (id: { id: number }) => id)();
  public delStarErr = createAction(this.del_star_err, msg => msg)();
}
