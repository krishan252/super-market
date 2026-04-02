<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const username = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref("")
const success = ref("")
const loading = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

function register() {
  error.value = ""
  success.value = ""

  if (!username.value || !password.value || !confirmPassword.value) {
    error.value = "Please fill all fields"
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match"
    return
  }

  loading.value = true

  setTimeout(() => {
    const account = {
      username: username.value,
      password: password.value,
    }

    localStorage.setItem("account", JSON.stringify(account))
    success.value = "Account created successfully"

    loading.value = false

    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }, 800)
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
      <h2 class="text-3xl font-bold text-center mb-6 dark:text-white">
        Create Account
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
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500
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
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500
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

      <div class="relative mb-5">
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="confirmPassword"
          required
          class="peer w-full p-3 border rounded-lg bg-transparent outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder=" "
        />
        <label
          class="absolute left-3 top-3 text-gray-500 transition-all
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500
          peer-valid:-top-2 peer-valid:text-sm
          bg-white dark:bg-gray-800 px-1 dark:text-gray-300"
        >
          Confirm Password
        </label>

        <span
          @click="showConfirmPassword = !showConfirmPassword"
          class="absolute right-3 top-3 cursor-pointer text-lg"
        >
          {{ showConfirmPassword ? "🙈" : "👁️" }}
        </span>
      </div>

      <p v-if="error" class="text-red-500 mb-3 text-sm">
        {{ error }}
      </p>

      <p v-if="success" class="text-green-600 mb-3 text-sm">
        {{ success }}
      </p>

      <button
        @click="register"
        class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:scale-105 transition"
      >
        {{ loading ? "Creating..." : "Create Account" }}
      </button>

      <p class="mt-5 text-center text-sm dark:text-gray-300">
        Already have an account?
        <span
          @click="router.push('/login')"
          class="text-blue-500 cursor-pointer font-semibold"
        >
          Login
        </span>
      </p>
    </div>
  </div>
</template>