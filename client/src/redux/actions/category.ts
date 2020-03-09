import { createAction, ActionType } from "typesafe-actions";

export type CategoryType = ActionType<typeof Category.instance>;

export class Category {
  public get_category_all: string = "GET_CATEGORY_ALL";
  public get_category_all_success: string = "GET_CATEGORY_ALL_SUCCESS";
  public get_category_all_error: string = "GET_CATEGORY_ALL_ERROR";

  public static article: Category;

  public static get instance() {
    if (!this.article) {
      this.article = new Category();
    }
    return this.article;
  }

  public getCategoryAll = createAction(this.get_category_all)();
  public getCategoryAllSuccess = createAction(
    this.get_category_all_success,
    category_list_all => category_list_all
  )();
  public getCategoryAllError = createAction(this.get_category_all_error)();
}
