import { api } from "@lib/utils/fetch/api";

export class TagApi {
  public static addTag(tag): Promise<ITag> {
    return api.post("/tag", tag);
  }

  public static delTag(id): Promise<ITag> {
    return api.delete(`/tag/${id}`);
  }

  public static updateTag(id, tag): Promise<ITag> {
    return api.patch(`/tag/${id}`, tag);
  }

  public static getTags(data = {}): Promise<ITag[]> {
    return api.get("/tag", data);
  }
}
