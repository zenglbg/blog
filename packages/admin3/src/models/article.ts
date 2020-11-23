import { getArticles } from '@/services/article';
import { createAction } from 'typesafe-actions';
import { Effect, Reducer } from 'umi';

export interface StateType {
  article?: IArticle;
}

export interface ArticleModelType {
  namespace: string;
  state: StateType;
  effects: {
    getArticles: Effect;
  };
  reducers: {
    setArticle: Reducer<StateType>;
  };
}

const Model: ArticleModelType = {
  namespace: 'article',
  state: {},

  effects: {
    *getArticles({ payload }, { put, call, fork }) {
      const response = yield call(getArticles, payload);
      console.log(response);
    },
  },
  reducers: {
    setArticle(state, { payload }) {
      return { ...state, article: payload };
    },
  },
};
export class ArticleAction {
  static setArticle = createAction('article/setArticle', (article: IArticle) => article)();
}
export default Model;
