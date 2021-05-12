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
} from "vant";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App)
  .use(Swipe)
  .use(SwipeItem)
  .use(SwipeCell)
  .use(Button)
  .use(Icon)
  .use(Form)
  .use(Field)
  .use(Toast)
  .use(router)
  .mount("#app");

window.vRouter = router;
