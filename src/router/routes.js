import Home from "../components/Home.vue";
import User from "../components/User.vue";
import Cart from "../components/Cart.vue";
import Category from "../components/Category.vue";
import Detail from "../components/Detail.vue";
import Login from "../view/Login.vue";
import ProductList from '../components/ProductList.vue'

export default [
  { path: "/", redirect: "/home", name: "index" },
  { path: "/home", component: Home, name: "home" },
  { path: "/cart", component: Cart, name: "cart" },
  { path: "/category", component: Category, name: "category" },
  { path: "/user", component: User, name: "user" },
  { path: "/detail", component: Detail, name: "detail" },
  { path: "/login", component: Login, name: "login" },
  { path: "/product-list",component:ProductList,name:"product-list"}
];
