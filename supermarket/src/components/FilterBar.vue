<script setup lang="ts">
import { ref } from "vue"

const search = ref("")
const emit = defineEmits(["search"])

function handleSearch() {
  emit("search", search.value)
}
</script>

<template>
  <div class="mb-4">
    <input
      v-model="search"
      @input="handleSearch"
      type="text"
      placeholder="Search products..."
      class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>