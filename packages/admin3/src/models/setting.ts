import { updateSetting, getSetting } from '@/services/setting';
import { createAction } from 'typesafe-actions';
import { Effect, Reducer } from 'umi';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

export interface SettingType {
  defaultSettings: DefaultSettings;
  userSetting: any;
}

export interface SettingModelType {
  namespace: 'settings';
  state: SettingType;
  effects: {
    upSetting: Effect;
    getSetting: Effect;
  };
  reducers: {
    setSetting: Reducer;
    setAloneSetting: Reducer;
    changeSetting: Reducer;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = (colorWeak) => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: {
    defaultSettings: defaultSettings,
    userSetting: {},
  },
  effects: {
    *getSetting({ payload }, { put, call }) {
      const response = yield call(getSetting, payload);
      yield put(ActionSetting.setSetting(response));
    },
    *upSetting({ payload }, { put, call, select }) {
      const userSetting = yield select((state: any) => state.settings.userSetting);
      const data = {
        ...userSetting,
        ...payload,
      };
      const response = yield call(updateSetting, data);
      yield put(ActionSetting.setSetting(response));
    },
  },
  reducers: {
    setAloneSetting(state, { payload }) {
      return {
        ...state,
        userSetting: {
          ...state.userSetting,
          ...payload,
        },
      };
    },
    setSetting(state, { payload }) {
      return { ...state, userSetting: payload };
    },
    changeSetting(state, { payload }) {
      const { colorWeak, contentWidth } = payload;

      if (state.defaultSettings.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      return {
        ...state,
        defaultSettings: payload,
      };
    },
  },
};

export class ActionSetting {
  static getSetting = createAction('settings/getSetting', (settings: any) => settings)();
  static upSetting = createAction('settings/upSetting', (settings: any) => settings)();
  static setSetting = createAction('setSetting', (settings: any) => settings)();
  static setAloneSetting = createAction(
    'settings/setAloneSetting',
    (objSetting: {
      systemLogo?: string;
      systemFavico?: string;
      wechat?: string;
      alipay?: string;
    }) => objSetting,
  )();
  static changeSetting = createAction(
    'settings/changeSetting',
    (settings: DefaultSettings) => settings,
  )();
}
export default SettingModel;
