import { api } from "../fetch";

export class TagApi {
  public static addTag(tag: any): Promise<ITag> {
    return api.post("/tag", tag);
  }

  public static delTag(id: string | number): Promise<ITag> {
    return api.delete(`/tag/${id}`);
  }

  public static updateTag(id: string | number, tag: any): Promise<ITag> {
    return api.patch(`/tag/${id}`, tag);
  }

  public static getTags(data = {}): Promise<ITag[]> {
    return api.get("/tag", data);
  }
}
