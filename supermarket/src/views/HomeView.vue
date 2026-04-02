<script setup lang="ts">
import ProductList from "../components/ProductList.vue"

const currentUser = localStorage.getItem("user")
</script>

<template>
  <div>
    <p v-if="currentUser" class="mb-4 text-sm text-gray-500 dark:text-gray-300">
      Welcome, {{ currentUser }}
    </p>

    <ProductList />
  </div>
</template>