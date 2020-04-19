export * from "./user";
export * from "./article";
export * from "./tag";
export * from "./category";
export * from "./star";

export * from "./option";

export interface IBaseAction<T> {
  type: string;
  payload: T;
}
