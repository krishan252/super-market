<script setup lang="ts">
import ProductList from "../components/ProductList.vue"
import { useCart } from "../store/cart"
import { useRouter } from "vue-router"
import { useTheme } from "../store/theme"

const { cart } = useCart()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
    <header class="bg-white shadow sticky top-0 z-10 dark:bg-gray-800 dark:shadow-gray-900">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          class="text-3xl font-bold text-blue-900 cursor-pointer dark:text-blue-400"
          @click="router.push('/')"
        >
          Super Market
        </h1>

        <div class="flex items-center gap-3">
          <button
            @click="toggleTheme"
            class="px-4 py-2 rounded-lg shadow bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {{ isDark ? "Light Mode" : "Dark Mode" }}
          </button>

          <div
            class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-blue-700 transition"
            @click="router.push('/cart')"
          >
            Cart: {{ cart.length }}
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-6">
      <ProductList />
    </main>
  </div>
</template>