export * from './user.action'
export * from './article.action'


export interface IBaseAction<T> {
  type: string;
  payload: T;
}
