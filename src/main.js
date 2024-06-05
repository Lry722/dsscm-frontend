import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueCookies from "vue-cookies";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vueCookies);
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
