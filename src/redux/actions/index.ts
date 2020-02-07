export * from "./user";
export * from "./article";

export interface IBaseAction<T> {
  type: string;
  payload: T;
}
