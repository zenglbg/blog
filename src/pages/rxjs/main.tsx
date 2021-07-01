import { createApp } from "vue";
import App from "./app";

import router from "./router";
import http from "@/lib/fetch/http";
import { getList } from "./api";
import { map } from "rxjs/operators";

const app = createApp({
  setup() {
    getList().subscribe(console.log);
    return () => <App></App>;
  },
});

app.config.globalProperties.$ajax = http;

app.use(router);
app.mount("#app");
