import { createAction, ActionType } from "typesafe-actions";
import category from "../reducer/category";

export type CategoryType = ActionType<typeof Category.instance>;

export class Category {
  public get_category: string = "GET_CATEGORY";
  public get_category_all: string = "GET_CATEGORY_ALL";
  public get_category_all_success: string = "GET_CATEGORY_ALL_SUCCESS";
  public get_category_all_error: string = "GET_CATEGORY_ALL_ERROR";

  public create_category = "CREATE_CATEGORY";
  public create_category_success = "CREATE_CATEGORY_SUCCESS";
  public create_category_err = "CREATE_CATEGORY_ERR";

  public del_category = "DEL_CATEGORY";
  public del_category_err = "DEL_CATEGORY_ERR";

  public static article: Category;

  public static get instance() {
    if (!this.article) {
      this.article = new Category();
    }
    return this.article;
  }

  public getCategory = createAction(
    this.get_category,
    (params: { name: string; pageNo: number; pageSize: number }) => params
  )();
  public getCategoryAll = createAction(this.get_category_all)();
  public getCategoryAllSuccess = createAction(
    this.get_category_all_success,
    category_list_all => category_list_all
  )();
  public getCategoryAllError = createAction(this.get_category_all_error)();

  public createCategory = createAction(
    this.create_category,
    (category: { name: string }) => category
  )();
  public createCategorySuccess = createAction(
    this.create_category_success,
    category => category
  )();
  public createCategoryErr = createAction(
    this.create_category_err,
    msg => msg
  )();

  public delCategory = createAction(
    this.del_category,
    (id: { id: number }) => id
  )();
  public delCategoryErr = createAction(this.del_category_err, msg => msg)();
}
