<script setup lang="ts">
import ProductList from "../components/ProductList.vue"
import { useCart } from "../store/cart"

const { cart } = useCart()
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- Title -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-blue-900">
        Kids Store
      </h1>

      <!-- Cart -->
      <div class="bg-white px-4 py-2 rounded-lg shadow">
        Cart: {{ cart.length }}
      </div>
    </div>

    <!-- Products -->
    <ProductList />

  </div>
</template>