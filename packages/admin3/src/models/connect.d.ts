import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import { StateType } from './login';
import { ArticleType } from './article';
import { TagType } from './tag';
import { CategoryType } from './category';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    article?: boolean;
    tag?: boolean;
    category?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
  article: ArticleType;
  tag: TagType;
  category: CategoryType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
