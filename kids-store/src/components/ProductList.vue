<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

const products = ref([])
const searchText = ref("")

const router = useRouter()

onMounted(async () => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  products.value = data.products
})

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

const filteredProducts = computed(() =>
  products.value.filter((p: any) =>
    p.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
)
</script>

<template>
  <div>
    <input
      v-model="searchText"
      placeholder="Search products..."
      class="w-full p-3 mb-6 border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:shadow-gray-900"
        @click="goToDetail(product.id)"
      >
        <div class="overflow-hidden">
          <img
            :src="product.thumbnail"
            class="w-full h-48 object-cover transition duration-300 group-hover:scale-110"
          />
        </div>

        <div class="p-4">
          <h2 class="font-semibold text-lg text-gray-800 mb-2 dark:text-white">
            {{ product.title }}
          </h2>

          <p class="text-blue-600 font-bold text-lg dark:text-blue-400">
            ${{ product.price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>