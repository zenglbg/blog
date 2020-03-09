import { createAction, ActionType } from "typesafe-actions";

export type TagType = ActionType<typeof Tag.instance>;

export class Tag {
  public get_tag_all: string = "GET_TAG_ALL";
  public get_tag_all_success: string = "GET_TAG_ALL_SUCCESS";
  public get_tag_all_error: string = "GET_TAG_ALL_ERROR";

  public static article: Tag;

  public static get instance() {
    if (!this.article) {
      this.article = new Tag();
    }
    return this.article;
  }

  public getTagAll = createAction(this.get_tag_all)();
  public getTagAllSuccess = createAction(
    this.get_tag_all_success,
    tag_list_all => tag_list_all
  )();
  public getTagAllError = createAction(this.get_tag_all_error)();
}
