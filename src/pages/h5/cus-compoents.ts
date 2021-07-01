import { App } from "@vue/runtime-core";
import {
  Button,
  Locale,
  Divider,
  DropdownItem,
  DropdownMenu,
  Icon,
  Form,
  Overlay,
  Field,
  Swipe,
  SwipeItem,
} from "vant";
// import enUS from 'vant/es/locale/lang/en-US';
import lang from "element-plus/lib/locale/lang/vi";

import "dayjs/locale/vi";
Locale.use("en-US", lang);

export function registerComponent(app: App) {
  app.component(Button.name, Button);
  app.component(Divider.name, Divider);
  app.component(Icon.name, Icon);
  app.component(Form.name, Form);
  app.component(Field.name, Field);
  // app.component(DropdownItem.name, DropdownItem);
  // app.component(DropdownMenu.name, DropdownMenu);
  app.use(DropdownMenu);
  app.use(DropdownItem);
  app.component(Overlay.name, Overlay);
  app.component(Swipe.name, Swipe);
  app.component(SwipeItem.name, SwipeItem);
}
