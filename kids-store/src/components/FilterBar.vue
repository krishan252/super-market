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
      class="border p-2 w-full rounded"
    />
  </div>
</template>
