<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCart } from "../store/cart"

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

const product = ref<any>(null)

// Fetch product by ID
onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  const data = await res.json()
  product.value = data
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6" v-if="product">

    <!-- Buttons -->
    <div class="mb-6">
      <button
        @click="router.back()"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <button
        @click="addToCart(product)"
        class="ml-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
    </div>

    <!-- Product Card -->
    <div class="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
      
      <img
        :src="product.thumbnail"
        class="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h1 class="text-2xl font-bold mb-3">
        {{ product.title }}
      </h1>

      <p class="mb-2">
        <strong>Price:</strong> ${{ product.price }}
      </p>

      <p class="mb-2">
        <strong>Category:</strong> {{ product.category }}
      </p>

      <p class="mb-2 text-gray-700">
        <strong>Description:</strong> {{ product.description }}
      </p>

    </div>
  </div>
</template>