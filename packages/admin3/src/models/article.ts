import { addArticle, getArticles, updateArticle } from '@/services/article';
import { createAction } from 'typesafe-actions';
import { message } from 'antd';
import { Effect, Reducer, history } from 'umi';

export interface StateType {
  article?: IArticle;
  isArticle: boolean;
}

export interface ArticleModelType {
  namespace: string;
  state: StateType;
  effects: {
    pushArticle: Effect;
    getArticles: Effect;
  };
  reducers: {
    setArticle: Reducer<StateType>;
  };
}

const Model: ArticleModelType = {
  namespace: 'article',
  state: {
    isArticle: false,
  },

  effects: {
    *getArticles({ payload }, { put, call, fork }) {
      const response = yield call(getArticles, payload);
      console.log(response);
    },
    *pushArticle({ payload }, { put, call, fork }) {
      let response;
      if (payload.id) {
        response = yield call(updateArticle, payload.id, payload);
      } else {
        response = yield call(addArticle, payload);
      }
      if (response) {
        message.success('🎉 🎉 🎉  登录成功！');
      }
    },
  },
  reducers: {
    setArticle(state, { payload }) {
      return { ...state, article: payload };
    },
  },
};
export class ArticleAction {
  static setArticle = createAction('article/setArticle', (article?: IArticle) => article)();

  static pushArticle = createAction('article/pushArticle', (article: IArticle) => article)();
}
export default Model;
