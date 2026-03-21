import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ProductDetail from "../components/ProductDetail.vue"
import CartView from "../views/CartView.vue" // 👈 add this

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductDetail,
  },
  {
    path: "/cart", // 👈 add this block
    name: "cart",
    component: CartView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router