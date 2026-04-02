<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, computed } from "vue"
import { addToCart, removeFromCart, isInCart } from "../store/cart"

const route = useRoute()
const router = useRouter()

const product = ref<any>(null)

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  product.value = await res.json()
})

function goBack() {
  router.back()
}

const added = computed(() => {
  return product.value ? isInCart(product.value.id) : false
})

function handleAdd() {
  addToCart(product.value)
}

function handleRemove() {
  removeFromCart(product.value.id)
}
</script>

<template>
  <div
    v-if="product"
    class="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
  >
    <button
      @click="goBack"
      class="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      ← Back
    </button>

    <img
      :src="product.thumbnail"
      class="w-full h-64 object-contain mb-4"
    />

    <h2 class="text-2xl font-bold mb-2 dark:text-white">
      {{ product.title }}
    </h2>

    <p class="text-lg text-blue-600 font-semibold mb-2">
      ${{ product.price }}
    </p>

    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {{ product.description }}
    </p>

    <button
      v-if="!added"
      @click="handleAdd"
      class="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
    >
      Add to Cart
    </button>

    <button
      v-else
      @click="handleRemove"
      class="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
    >
      Remove from Cart
    </button>
  </div>
</template>