import { getArticles } from '@/services/article';
import { Effect, Reducer } from 'umi';

export interface StateType {}

export interface ArticleModelType {
  namespace: string;
  state: StateType;
  effects: {
    getArticles: Effect;
  };
  reducers: {
    setArticles: Reducer;
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
    setArticles() {},
  },
};

export default Model;
