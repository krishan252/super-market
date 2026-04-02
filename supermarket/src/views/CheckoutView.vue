<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { cart } from "../store/cart"

const router = useRouter()

const fullName = ref("")
const email = ref("")
const phone = ref("")
const address = ref("")
const city = ref("")
const paymentMethod = ref("Cash on Delivery")
const message = ref("")
const error = ref("")

const total = computed(() =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function placeOrder() {
  error.value = ""
  message.value = ""

  if (!fullName.value || !email.value || !phone.value || !address.value || !city.value) {
    error.value = "Please fill all fields"
    return
  }

  const order = {
    customer: {
      fullName: fullName.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      city: city.value,
      paymentMethod: paymentMethod.value,
    },
    items: [...cart],
    total: total.value,
    date: new Date().toLocaleString(),
  }

  // Save order
  localStorage.setItem("lastOrder", JSON.stringify(order))

  // Clear cart
  cart.splice(0, cart.length)

  message.value = "Order placed successfully ✅"

  // 🔥 IMPORTANT CHANGE (Redirect to success page)
  setTimeout(() => {
    router.push("/order-success")
  }, 1200)
}
</script>

<template>
  <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
    
    <!-- Customer Form -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold mb-5 dark:text-white">
        Customer Details
      </h2>

      <input
        v-model="fullName"
        placeholder="Full Name"
        class="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <input
        v-model="phone"
        placeholder="Phone Number"
        class="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <textarea
        v-model="address"
        placeholder="Address"
        rows="3"
        class="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
      ></textarea>

      <input
        v-model="city"
        placeholder="City"
        class="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <select
        v-model="paymentMethod"
        class="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
      >
        <option>Cash on Delivery</option>
        <option>Card Payment</option>
        <option>Bank Transfer</option>
      </select>

      <p v-if="error" class="text-red-500 mb-2">
        {{ error }}
      </p>

      <p v-if="message" class="text-green-500 mb-2">
        {{ message }}
      </p>

      <button
        @click="placeOrder"
        class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>

    <!-- Order Summary -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold mb-5 dark:text-white">
        Order Summary
      </h2>

      <div v-if="cart.length === 0" class="text-gray-500 dark:text-gray-300">
        No items in cart
      </div>

      <div v-else>
        <div
          v-for="item in cart"
          :key="item.id"
          class="flex justify-between items-center border-b py-3"
        >
          <div>
            <p class="font-medium dark:text-white">
              {{ item.title }}
            </p>
            <p class="text-sm text-gray-500">
              Qty: {{ item.quantity }}
            </p>
          </div>

          <p class="font-semibold dark:text-white">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </p>
        </div>

        <div class="mt-5 text-right text-xl font-bold dark:text-white">
          Total: ${{ total.toFixed(2) }}
        </div>
      </div>
    </div>

  </div>
</template>