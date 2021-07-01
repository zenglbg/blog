// import "element-plus/packages/theme-chalk/src/base.scss";
import {
  ElButton,
  ElRow,
  ElCol,
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElCarousel,
  ElCarouselItem,
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
} from "element-plus";
import lang from "element-plus/lib/locale/lang/vi";
import "dayjs/locale/vi";
import locale from "element-plus/lib/locale";
import { App } from "vue";
locale.use(lang);

export function registerComponent(app: App) {
  app.component(ElButton.name, ElButton);
  app.component(ElRow.name, ElRow);
  app.component(ElCol.name, ElCol);
  app.component(ElContainer.name, ElContainer);
  app.component(ElHeader.name, ElHeader);
  app.component(ElMain.name, ElMain);
  app.component(ElFooter.name, ElFooter);
  app.component(ElDropdown.name, ElDropdown);
  app.component(ElDropdownItem.name, ElDropdownItem);
  app.component(ElDropdownMenu.name, ElDropdownMenu);
  app.component(ElIcon.name, ElIcon);
  app.component(ElDivider.name, ElDivider);
  app.component(ElCarousel.name, ElCarousel);
  app.component(ElCarouselItem.name, ElCarouselItem);
  app.component(ElForm.name, ElForm);
  app.component(ElFormItem.name, ElFormItem);
  app.component(ElInput.name, ElInput);
}
