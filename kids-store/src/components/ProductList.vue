<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}

const products = ref<Product[]>([])

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products')
  const data = await response.json()
  products.value = data.products
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div v-for="product in products" :key="product.id" class="p-4 shadow rounded-lg">
      <img :src="product.thumbnail" class="w-full h-40 object-cover" />
      <h2 class="font-bold mt-2">{{ product.title }}</h2>
      <p class="text-blue-600">${{ product.price }}</p>
    </div>
  </div>
</template>