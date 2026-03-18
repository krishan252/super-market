import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ProductDetail from "../components/ProductDetail.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router