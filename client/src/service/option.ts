import { Api } from "@service";

export class Option extends Api {
  public static add<T, J>(option_name: T, option_values: J) {
    return this.instance.post("/api/option/add", {
      option_name,
      option_values,
    });
  }
  public static del<T, J>(option_name: T) {
    return this.instance.post("/api/option/del", {
      option_name,
    });
  }
  public static update<T, J>(option_name: T, option_values: J) {
    return this.instance.post("/api/option/update", {
      option_name,
      option_values,
    });
  }

  public static get_list_all() {
    return this.instance.get("/api/option/list/all");
  }
}
