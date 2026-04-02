import { ref } from "vue"

export const currentUser = ref<string | null>(localStorage.getItem("user"))

export function loginUser(username: string) {
  localStorage.setItem("user", username)
  currentUser.value = username
}

export function logoutUser() {
  localStorage.removeItem("user")
  currentUser.value = null
}