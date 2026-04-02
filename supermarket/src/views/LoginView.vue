<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const username = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)
const showPassword = ref(false)

onMounted(() => {
  const currentUser = localStorage.getItem("user")

  // If already logged in, go home
  if (currentUser) {
    router.push("/")
  }
})

function login() {
  error.value = ""
  loading.value = true

  setTimeout(() => {
    const savedUser = JSON.parse(localStorage.getItem("account") || "{}")

    if (
      username.value === savedUser.username &&
      password.value === savedUser.password
    ) {
      localStorage.setItem("user", username.value)
      router.push("/")
      window.location.reload()
    } else {
      error.value = "Invalid username or password"
    }

    loading.value = false
  }, 800)
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
      <h2 class="text-3xl font-bold text-center mb-6 dark:text-white">
        Welcome Back
      </h2>

      <div class="relative mb-5">
        <input
          v-model="username"
          type="text"
          required
          class="peer w-full p-3 border rounded-lg bg-transparent outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder=" "
        />
        <label
          class="absolute left-3 top-3 text-gray-500 transition-all
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500
          peer-valid:-top-2 peer-valid:text-sm
          bg-white dark:bg-gray-800 px-1 dark:text-gray-300"
        >
          Username
        </label>
      </div>

      <div class="relative mb-5">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          required
          class="peer w-full p-3 border rounded-lg bg-transparent outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder=" "
        />
        <label
          class="absolute left-3 top-3 text-gray-500 transition-all
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500
          peer-valid:-top-2 peer-valid:text-sm
          bg-white dark:bg-gray-800 px-1 dark:text-gray-300"
        >
          Password
        </label>

        <span
          @click="showPassword = !showPassword"
          class="absolute right-3 top-3 cursor-pointer text-lg"
        >
          {{ showPassword ? "🙈" : "👁️" }}
        </span>
      </div>

      <p v-if="error" class="text-red-500 mb-3 text-sm">
        {{ error }}
      </p>

      <button
        @click="login"
        class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:scale-105 transition"
      >
        {{ loading ? "Loading..." : "Login" }}
      </button>

      <p class="mt-5 text-center text-sm dark:text-gray-300">
        Don't have an account?
        <span
          @click="router.push('/register')"
          class="text-blue-500 cursor-pointer font-semibold"
        >
          Create Account
        </span>
      </p>
    </div>
  </div>
</template>