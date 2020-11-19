import { api } from "@lib/utils/fetch/api";

export class CategoryApi {
  public static addCategory(category): Promise<ICategory> {
    return api.post("/category", category);
  }

  public static delCategory(id): Promise<ICategory> {
    return api.delete(`/category/${id}`);
  }

  public static updateCategory(id, category): Promise<ICategory> {
    return api.patch(`/category/${id}`, category);
  }

  public static getCategorys(data = {}): Promise<ICategory[]> {
    return api.get("/category", data);
  }
}
