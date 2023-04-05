import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import store from "./store";

import "@/scss/common.scss";

createApp(App).use(store).use(ElementPlus).mount("#app");
