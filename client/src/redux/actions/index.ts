export * from "./user";
export * from "./article";
export * from "./tag";
export * from "./category";
export * from "./star";

export interface IBaseAction<T> {
  type: string;
  payload: T;
}
