<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { cart } from "../store/cart"

const router = useRouter()
const order = ref<any>(null)

onMounted(() => {
  const savedOrder = localStorage.getItem("lastOrder")

  if (savedOrder) {
    order.value = JSON.parse(savedOrder)
  }

  // clear cart after order success
  cart.splice(0, cart.length)
})
</script>

<template>
  <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
    <div class="text-6xl mb-4">✅</div>

    <h1 class="text-3xl font-bold text-green-600 mb-3">
      Order Placed Successfully!
    </h1>

    <p class="text-gray-600 dark:text-gray-300 mb-6">
      Thank you for your purchase. Your order has been received.
    </p>

    <div
      v-if="order"
      class="text-left bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
    >
      <h2 class="text-xl font-bold mb-4 dark:text-white">
        Order Details
      </h2>

      <p class="mb-2 dark:text-gray-200">
        <strong>Name:</strong> {{ order.customer.fullName }}
      </p>
      <p class="mb-2 dark:text-gray-200">
        <strong>Email:</strong> {{ order.customer.email }}
      </p>
      <p class="mb-2 dark:text-gray-200">
        <strong>Phone:</strong> {{ order.customer.phone }}
      </p>
      <p class="mb-2 dark:text-gray-200">
        <strong>Address:</strong> {{ order.customer.address }}, {{ order.customer.city }}
      </p>
      <p class="mb-2 dark:text-gray-200">
        <strong>Payment:</strong> {{ order.customer.paymentMethod }}
      </p>
      <p class="mb-4 dark:text-gray-200">
        <strong>Date:</strong> {{ order.date }}
      </p>

      <div class="border-t pt-4 dark:border-gray-600">
        <h3 class="font-bold mb-3 dark:text-white">
          Items
        </h3>

        <div
          v-for="item in order.items"
          :key="item.id"
          class="flex justify-between py-2 border-b dark:border-gray-600"
        >
          <span class="dark:text-gray-200">
            {{ item.title }} × {{ item.quantity }}
          </span>
          <span class="font-medium dark:text-white">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </span>
        </div>

        <div class="text-right text-xl font-bold mt-4 dark:text-white">
          Total: ${{ order.total.toFixed(2) }}
        </div>
      </div>
    </div>

    <button
      @click="router.push('/')"
      class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    >
      Back to Home
    </button>
  </div>
</template>