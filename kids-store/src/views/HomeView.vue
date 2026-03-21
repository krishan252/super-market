<script setup lang="ts">
import ProductList from "../components/ProductList.vue"
import { useCart } from "../store/cart"
import { useRouter } from "vue-router"

// cart store
const { cart } = useCart()

// router
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    
    <!-- Top Bar -->
    <div class="flex justify-between items-center mb-6">
      
      <!-- Title -->
      <h1 class="text-4xl font-bold text-blue-900">
        Kids Store
      </h1>

      <!-- Cart Button -->
      <div
        class="bg-white px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-gray-100"
        @click="router.push('/cart')"
      >
        Cart: {{ cart.length }}
      </div>

    </div>

    <!-- Product List -->
    <ProductList />
    
  </div>
</template>