import { createApp } from "vue";
import App from "./App.vue";
import "vant/lib/index.css";
import "lib-flexible/flexible";
import routes from "./router/routes";
import {
  Button,
  Form,
  Field,
  Toast,
  Icon,
  Swipe,
  SwipeItem,
  SwipeCell,
  Tab,
  Tabs,
  List,
  PullRefresh,
} from "vant";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
// 全局过滤器
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith("http")) {
      return url;
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`;
      return url;
    }
  },
};

app
  .use(PullRefresh)
  .use(List)
  .use(Swipe)
  .use(SwipeItem)
  .use(SwipeCell)
  .use(Button)
  .use(Icon)
  .use(Form)
  .use(Field)
  .use(Toast)
  .use(router)
  .use(Tab)
  .use(Tabs)
  .mount("#app");

window.vRouter = router;
