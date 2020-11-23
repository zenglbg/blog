import { Effect, Reducer } from 'umi';

export interface TagType {
  tag?: ITag;
}

export interface TagModelType {
  namespace: string;
  state: TagType;
  effects: {};
  reducers: {};
}

const Model: TagModelType = {
  namespace: 'tag',
  state: {
    tag: undefined,
  },

  effects: {},
  reducers: {
    setTag() {},
  },
};

export default Model;
