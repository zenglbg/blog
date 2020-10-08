import { Http } from "@utils/fetch/http";

export class Categorysr {
  public static addCategory(category) {
    return Http.post("/category", category);
  }

  public static delCategory(id) {
    return Http.delete(`/category/${id}`);
  }

  public static updateCategory(id, category) {
    return Http.patch(`/category/${id}`, category);
  }

  public static getCategorys(data={}) {
    return Http.get("/category", data);
  }
}
