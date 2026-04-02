<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

const products = ref<any[]>([])
const searchText = ref("")
const selectedCategory = ref("all")

const router = useRouter()

onMounted(async () => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  products.value = data.products
})

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

const categories = computed(() => {
  const allCategories = products.value.map((p) => p.category)
  return ["all", ...new Set(allCategories)]
})

const filteredProducts = computed(() =>
  products.value.filter((p: any) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchText.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === "all" ||
      p.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
)
</script>

<template>
  <div>
    <!-- Search -->
    <input
      v-model="searchText"
      placeholder="Search products..."
      class="w-full p-3 mb-5 border rounded-xl bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />

    <!-- Real top category nav -->
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow mb-6 overflow-x-auto">
      <div class="flex items-center gap-2 px-3 py-3 min-w-max">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
          :class="
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          "
        >
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </button>
      </div>
    </div>

    <!-- Products -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        @click="goToDetail(product.id)"
        class="cursor-pointer bg-white rounded-xl shadow hover:shadow-2xl hover:-translate-y-2 transition p-4 dark:bg-gray-800"
      >
        <img
          :src="product.thumbnail"
          class="w-full h-48 object-cover rounded-lg mb-3"
        />

        <h2 class="font-semibold text-lg dark:text-white">
          {{ product.title }}
        </h2>

        <p class="text-blue-600 font-bold">
          ${{ product.price }}
        </p>

        <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">
          {{ product.category }}
        </p>
      </div>
    </div>
  </div>
</template>