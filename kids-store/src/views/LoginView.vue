<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const username = ref("")
const password = ref("")

function login() {
  if (username.value && password.value) {
    localStorage.setItem("user", username.value)
    router.push("/")
  } else {
    alert("Please enter username and password")
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

    <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-80">
      <h2 class="text-2xl font-bold mb-6 text-center dark:text-white">
        Login
      </h2>

      <input
        v-model="username"
        placeholder="Username"
        class="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <button
        @click="login"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Login
      </button>
    </div>

  </div>
</template>