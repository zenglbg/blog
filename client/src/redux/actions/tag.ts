import { createAction, ActionType } from "typesafe-actions";

export type TagType = ActionType<typeof Tags.instance>;

export class Tags {
  public get_tag: string = "GET_TAG";
  public get_tag_all: string = "GET_TAG_ALL";
  public get_tag_all_success: string = "GET_TAG_ALL_SUCCESS";
  public get_tag_all_error: string = "GET_TAG_ALL_ERROR";

  public create_tag = "CREATE_TAG";
  public create_tag_success = "CREATE_TAG_SUCCESS";
  public create_tag_err = "CREATE_TAG_ERR";

  public del_tag = "DEL_TAG";
  public del_tag_err = "DEL_TAG_ERR";

  public static article: Tags;

  public static get instance() {
    if (!this.article) {
      this.article = new Tags();
    }
    return this.article;
  }

  public getTag = createAction(
    this.get_tag,
    (params: { name: string; pageNo: number; pageSize: number }) => params
  )();
  public getTagAll = createAction(this.get_tag_all)();
  public getTagAllSuccess = createAction(
    this.get_tag_all_success,
    tag_list_all => tag_list_all
  )();
  public getTagAllError = createAction(this.get_tag_all_error)();

  public createTag = createAction(
    this.create_tag,
    (tag: { name: string }) => tag
  )();
  public createTagSuccess = createAction(this.create_tag_success)();
  public createTagErr = createAction(this.create_tag_err, msg => msg)();

  public delTag = createAction(this.del_tag, (id: { id: number }) => id)();
  public delTagErr = createAction(this.del_tag_err, msg => msg)();
}
