import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import CartView from "../views/CartView.vue"
import LoginView from "../views/LoginView.vue"
import ProductDetail from "../components/ProductDetail.vue"

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/cart",
    component: CartView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/product/:id",
    component: ProductDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router