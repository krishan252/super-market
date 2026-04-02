<script setup lang="ts">
import { computed } from "vue"
import { cart, removeFromCart, increaseQuantity, decreaseQuantity } from "../store/cart"

const total = computed(() =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
</script>

<template>
  <div class="max-w-3xl mx-auto">

    <h2 class="text-2xl font-bold mb-6 dark:text-white">
      Your Cart 🛒
    </h2>

    <!-- Empty -->
    <p v-if="cart.length === 0" class="text-gray-500 dark:text-gray-300">
      Your cart is empty
    </p>

    <!-- Items -->
    <div v-else>
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex justify-between items-center bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow"
      >
        <div>
          <h3 class="font-semibold dark:text-white">
            {{ item.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            ${{ item.price }}
          </p>
          <p class="text-sm text-gray-500">
            Quantity: {{ item.quantity }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="decreaseQuantity(item.id)"
            class="px-2 py-1 bg-gray-300 rounded"
          >
            -
          </button>

          <button
            @click="increaseQuantity(item.id)"
            class="px-2 py-1 bg-gray-300 rounded"
          >
            +
          </button>

          <button
            @click="removeFromCart(item.id)"
            class="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- Total -->
      <h3 class="text-xl font-bold text-right mt-6 dark:text-white">
        Total: ${{ total.toFixed(2) }}
      </h3>
    </div>

  </div>
</template>