<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const product = ref<any>(null)

onMounted(async () => {
  const response = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  const data = await response.json()
  product.value = data
})
</script>

<template>
  <div class="p-6" v-if="product">
    <img :src="product.thumbnail" class="w-64 h-64 object-cover mb-4" />
    <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
    <p class="mb-2"><strong>Price:</strong> ${{ product.price }}</p>
    <p class="mb-2"><strong>Category:</strong> {{ product.category }}</p>
    <p class="mb-2"><strong>Description:</strong> {{ product.description }}</p>
  </div>
</template>