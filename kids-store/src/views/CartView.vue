<script setup lang="ts">
import { useCart } from "../store/cart"

const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()

const total = () => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
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
          <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="decreaseQuantity(item.id)"
            class="bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>

          <button
            @click="increaseQuantity(item.id)"
            class="bg-gray-300 px-3 py-1 rounded"
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

      <div class="text-right font-bold text-xl mt-6">
        Total: ${{ total().toFixed(2) }}
      </div>
    </div>
  </div>
</template>