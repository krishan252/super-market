<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

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
    
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      ← Back
    </button>

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