import { Effect, Reducer } from 'umi';

export interface StateType {
  category?: ICategory;
}

export interface CategoryModelType {
  namespace: string;
  state: StateType;
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
