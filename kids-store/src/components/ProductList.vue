<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import FilterBar from "./FilterBar.vue"

const products = ref<any[]>([])
const searchText = ref("")

const router = useRouter()

// Navigate to detail page
function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

// Search update
function updateSearch(text: string) {
  searchText.value = text
}

// Filter products
const filteredProducts = computed(() =>
  products.value.filter((p: any) =>
    p.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
)

// Fetch products
onMounted(async () => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  products.value = data.products
})
</script>

<template>
  <!-- Search bar -->
  <FilterBar @search="updateSearch" />

  <!-- Product grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="p-4 bg-white border rounded-xl shadow hover:shadow-lg cursor-pointer transition"
      @click="goToDetail(product.id)"
    >
      <img
        :src="product.thumbnail"
        class="w-full h-40 object-cover rounded-lg"
      />

      <h2 class="font-bold mt-3 text-lg">
        {{ product.title }}
      </h2>

      <p class="text-gray-600 mt-1">
        ${{ product.price }}
      </p>
    </div>
  </div>
</template>