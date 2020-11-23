import { Effect, Reducer } from 'umi';

export interface CategoryType {
  category?: ICategory;
}

export interface CategoryModelType {
  namespace: string;
  state: CategoryType;
  effects: {};
  reducers: {};
}

const Model: CategoryModelType = {
  namespace: 'category',
  state: {
    category: undefined
  },

  effects: {},
  reducers: {
    setCategory () {

    }
  },
};

export default Model;
