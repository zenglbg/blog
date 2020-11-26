import { createAction } from 'typesafe-actions';
import { Effect, Reducer } from 'umi';
import { getFiles } from '@/services/file';

export interface FileType {
  files?: IFile[];
  file?: IFile;
  fileVisible: boolean;
}

export interface FileModelType {
  namespace: string;
  state: FileType;
  effects: {
    getFiles: Effect;
  };
  reducers: {
    setFiles: Reducer;
    setFile: Reducer;
    setVisible: Reducer;
  };
}

const Model: FileModelType = {
  namespace: 'file',
  state: {
    files: undefined,
    file: undefined,
    fileVisible: false,
  },
  effects: {
    *getFiles({ payload }, { call, put }) {
      const response = yield call(getFiles, payload);
      if (response[status] !== 400) {
        yield put({
          type: 'setFiles',
          payload: response,
        });
      }
    },
  },
  reducers: {
    setFile(state, { payload }) {
      return { ...state, file: payload };
    },
    setFiles(state, { payload }) {
      return { ...state, files: payload };
    },
    setVisible(state, { payload }) {
      return { ...state, fileVisible: payload };
    },
  },
};
export class ActionFile {
  public static getFiles = createAction('file/getFiles', (params) => params)();
  public static setFile = createAction('file/setFile', (file: IFile) => file)();
  public static setFiles = createAction('file/setFiles', (files: IFile[]) => files)();
  public static setVisible = createAction(
    'file/setVisible',
    (fileVisible: boolean) => fileVisible,
  )();
}
export default Model;
