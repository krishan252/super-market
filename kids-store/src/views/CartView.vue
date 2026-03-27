<script setup lang="ts">
import { computed } from "vue"
import { cart, removeFromCart, increaseQuantity, decreaseQuantity } from "../store/cart"

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6 dark:bg-gray-900 dark:text-white">
    <div class="max-w-5xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Your Cart 🛒</h1>
      </div>

      <div
        v-if="cart.length === 0"
        class="text-gray-500 bg-white p-6 rounded-xl shadow dark:bg-gray-800 dark:text-gray-300"
      >
        Your cart is empty
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="item in cart"
          :key="item.id"
          class="bg-white p-5 rounded-2xl shadow flex justify-between items-center dark:bg-gray-800"
        >
          <div>
            <h2 class="font-bold text-lg">{{ item.title }}</h2>
            <p class="text-gray-600 dark:text-gray-300">${{ item.price }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Quantity: {{ item.quantity }}</p>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="decreaseQuantity(item.id)"
              class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              -
            </button>

            <button
              @click="increaseQuantity(item.id)"
              class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              +
            </button>

            <button
              @click="removeFromCart(item.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>

        <div class="text-right font-bold text-2xl mt-6">
          Total: ${{ total.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>