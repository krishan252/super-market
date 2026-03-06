<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import FilterBar from "./FilterBar.vue"

const products = ref<any[]>([])
const searchText = ref("")

function updateSearch(text: string) {
  searchText.value = text
}

const filteredProducts = computed(() =>
  products.value.filter((p: any) =>
    p.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
)

onMounted(async () => {
  const response = await fetch("https://dummyjson.com/products")
  const data = await response.json()
  products.value = data.products
})
</script>

<template>
  <FilterBar @search="updateSearch" />

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="p-4 border rounded"
    >
      <img :src="product.thumbnail" class="w-full h-40 object-cover" />
      <h2 class="font-bold mt-2">{{ product.title }}</h2>
      <p>${{ product.price }}</p>
    </div>
  </div>
</template>