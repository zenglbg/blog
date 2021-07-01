import { createApp } from "vue";
import App from "./App.vue";
import { registerComponent } from "./cus-compoents";
import { router } from "./router";
import http from "@/lib/fetch/http";
import i18n from "@/i18n";

const app = createApp(App);
app.config.globalProperties.$http = http;
registerComponent(app);

app.use(router);
app.use(i18n);

app.mount("#app");
