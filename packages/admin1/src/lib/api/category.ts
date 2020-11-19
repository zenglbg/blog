import { api } from "@/lib/fetch/api";

export class CategoryApi {
  public static addCategory(category: any): Promise<ICategory> {
    return api.post("/category", category);
  }

  public static delCategory(id: any): Promise<ICategory> {
    return api.delete(`/category/${id}`);
  }

  public static updateCategory(id: any, category: any): Promise<ICategory> {
    return api.patch(`/category/${id}`, category);
  }

  public static getCategorys(data = {}): Promise<ICategory[]> {
    return api.get("/category", data);
  }
}
