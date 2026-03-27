<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { useRouter } from "vue-router"
import { cart } from "./store/cart"

const router = useRouter()

const darkMode = ref(false)
const user = ref<string | null>(localStorage.getItem("user"))

onMounted(() => {
  const savedTheme = localStorage.getItem("darkMode")
  darkMode.value = savedTheme === "true"
  document.documentElement.classList.toggle("dark", darkMode.value)
})

function toggleDark() {
  darkMode.value = !darkMode.value
}

watch(darkMode, (val) => {
  document.documentElement.classList.toggle("dark", val)
  localStorage.setItem("darkMode", val.toString())
})

const cartCount = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0)
)

function logout() {
  localStorage.removeItem("user")
  user.value = null
  router.push("/login")
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-900/80 dark:border-gray-700/50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Left -->
        <div class="flex items-center gap-3">
          <div
            @click="router.push('/')"
            class="cursor-pointer"
          >
            <h1 class="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Super Market
            </h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Smart shopping made easy
            </p>
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-3">
          <!-- Dark mode -->
          <button
            @click="toggleDark"
            class="h-11 w-11 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xl flex items-center justify-center transition shadow-sm"
            :title="darkMode ? 'Light mode' : 'Dark mode'"
          >
            {{ darkMode ? "☀️" : "🌙" }}
          </button>

          <!-- User -->
          <template v-if="!user">
            <button
              @click="router.push('/login')"
              class="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md"
            >
              Login
            </button>
          </template>

          <template v-else>
            <div class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
              <span class="text-sm">👤</span>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ user }}
              </span>
            </div>

            <button
              @click="logout"
              class="px-4 py-2 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition shadow-sm"
            >
              Logout
            </button>
          </template>

          <!-- Cart -->
          <button
            @click="router.push('/cart')"
            class="relative px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            🛒 Cart
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow"
            >
              {{ cartCount }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Page -->
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>