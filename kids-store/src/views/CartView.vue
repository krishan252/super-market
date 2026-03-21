<script setup lang="ts">
import { useCart } from "../store/cart"

const { cart, removeFromCart } = useCart()

const total = () => {
  return cart.value.reduce((sum, item) => sum + item.price, 0)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-6">Your Cart 🛒</h1>

    <div v-if="cart.length === 0" class="text-gray-500">
      Your cart is empty
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cart"
        :key="item.id"
        class="bg-white p-4 rounded-xl shadow flex justify-between items-center"
      >
        <div>
          <h2 class="font-bold text-lg">{{ item.title }}</h2>
          <p class="text-gray-600">${{ item.price }}</p>
        </div>

        <button
          @click="removeFromCart(item.id)"
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>

      <div class="text-right font-bold text-xl mt-6">
        Total: ${{ total() }}
      </div>
    </div>
  </div>
</template>