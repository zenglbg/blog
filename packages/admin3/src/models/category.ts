import { Effect, Reducer } from 'umi';
// import { delCategory, updateCategory, addCategory, getCategorys } from '@/services/category';
import { createAction } from 'typesafe-actions';

export interface CategoryType {
  category?: ICategory;
  modalVisible: boolean;
  categorys?: ICategory[];
}

export interface CategoryModelType {
  namespace: string;
  state: CategoryType;
  effects: {
    getCategorys: Effect;
    delCategory: Effect;
    updateCategory: Effect;
    addCategory: Effect;
  };
  reducers: {
    setCategory: Reducer;
    setModalVisible: Reducer;
    setCategorys: Reducer;
  };
}

const Model: CategoryModelType = {
  namespace: 'category',
  state: { modalVisible: false },
  effects: {
    *getCategorys({ payload }, { put, call }) {
      const response = yield call('getCategorys', payload);
      if (response) {
        yield put(ActionCategory.setCategorys(response));
      }
    },
    *delCategory({ payload }, { put, call }) {
      const response = yield call('delCategory', payload.id);
    },
    *updateCategory({ payload }, { put, call }) {
      const response = yield call('updateCategory', payload.id, payload);
    },
    *addCategory({ payload }, { put, call }) {
      const response = yield call('addCategory', payload);
    },
  },
  reducers: {
    setCategory(state, { payload }) {
      return {
        ...state,
        category: payload,
      };
    },
    setModalVisible(state, { payload }) {
      return {
        ...state,
        modalVisible: payload,
      };
    },
    setCategorys(state, { payload }) {
      return {
        ...state,
        categorys: payload,
      };
    },
  },
};
export class ActionCategory {
  static getCategorys = createAction('category/getCategorys', (params = {}) => params)();
  static delCategory = createAction('category/delCategory', (category: ICategory) => category)();
  static updateCategory = createAction(
    'category/updateCategory',
    (category: ICategory) => category,
  )();
  static addCategory = createAction('category/addCategory', (category: ICategory) => category)();
  static setCategory = createAction('category/setCategory', (category: ICategory) => category)();
  static setModalVisible = createAction(
    'category/setModalVisible',
    (modalVisible: boolean) => modalVisible,
  )();
  static setCategorys = createAction(
    'category/setCategorys',
    (categorys: ICategory[]) => categorys,
  )();
}
export default Model;
