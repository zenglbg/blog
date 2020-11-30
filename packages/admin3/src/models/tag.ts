import { Effect, Reducer } from 'umi';
// import { delTag, updateTag, addTag, getTags } from '@/services/tag';
import { createAction } from 'typesafe-actions';

export interface TagType {
  tag?: ITag;
  modalVisible: boolean;
  tags?: ITag[];
}

export interface TagModelType {
  namespace: string;
  state: TagType;
  effects: {
    getTags: Effect;
    delTag: Effect;
    updateTag: Effect;
    addTag: Effect;
  };
  reducers: {
    setTag: Reducer;
    setModalVisible: Reducer;
    setTags: Reducer;
  };
}

const Model: TagModelType = {
  namespace: 'tag',
  state: { modalVisible: false },
  effects: {
    *getTags({ payload }, { put, call }) {
      const response = yield call('getTags', payload);
      if (response) {
        yield put(ActionTag.setTags(response));
      }
    },
    *delTag({ payload }, { put, call }) {
      const response = yield call('delTag', payload.id);
    },
    *updateTag({ payload }, { put, call }) {
      const response = yield call('updateTag', payload.id, payload);
    },
    *addTag({ payload }, { put, call }) {
      const response = yield call('addTag', payload);
    },
  },
  reducers: {
    setTag(state, { payload }) {
      return {
        ...state,
        tag: payload,
      };
    },
    setModalVisible(state, { payload }) {
      return {
        ...state,
        modalVisible: payload,
      };
    },
    setTags(state, { payload }) {
      return {
        ...state,
        tags: payload,
      };
    },
  },
};
export class ActionTag {
  static getTags = createAction('tag/getTags', (params = {}) => params)();
  static delTag = createAction('tag/delTag', (tag: ITag) => tag)();
  static updateTag = createAction(
    'tag/updateTag',
    (tag: ITag) => tag,
  )();
  static addTag = createAction('tag/addTag', (tag: ITag) => tag)();
  static setTag = createAction('tag/setTag', (tag: ITag) => tag)();
  static setModalVisible = createAction(
    'tag/setModalVisible',
    (modalVisible: boolean) => modalVisible,
  )();
  static setTags = createAction(
    'tag/setTags',
    (tags: ITag[]) => tags,
  )();
}
export default Model;
