import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import CartView from "../views/CartView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import CheckoutView from "../views/CheckoutView.vue"
import OrderSuccessView from "../views/OrderSuccessView.vue"
import ProductDetail from "../components/ProductDetail.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/cart", component: CartView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/checkout", component: CheckoutView },
  { path: "/order-success", component: OrderSuccessView },
  { path: "/product/:id", component: ProductDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user")

  if (to.path === "/checkout" && !user) {
    next("/login")
  } else {
    next()
  }
})

export default router