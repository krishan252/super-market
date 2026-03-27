import { ref } from "vue"

export const cart = ref<any[]>([])

export function addToCart(product: any) {
  const existing = cart.value.find(item => item.id === product.id)

  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

export function removeFromCart(id: number) {
  cart.value = cart.value.filter(item => item.id !== id)
}

export function increaseQuantity(id: number) {
  const item = cart.value.find(item => item.id === id)
  if (item) item.quantity++
}

export function decreaseQuantity(id: number) {
  const item = cart.value.find(item => item.id === id)
  if (!item) return

  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(id)
  }
}