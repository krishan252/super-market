import { reactive } from "vue"

export const cart = reactive<any[]>([])

export function addToCart(product: any) {
  const existing = cart.find((p) => p.id === product.id)

  if (existing) {
    return false
  }

  cart.push({ ...product, quantity: 1 })
  return true
}

export function removeFromCart(id: number) {
  const index = cart.findIndex((p) => p.id === id)
  if (index !== -1) cart.splice(index, 1)
}

export function isInCart(id: number) {
  return cart.some((p) => p.id === id)
}

export function increaseQuantity(id: number) {
  const item = cart.find((p) => p.id === id)
  if (item) {
    item.quantity++
  }
}

export function decreaseQuantity(id: number) {
  const item = cart.find((p) => p.id === id)
  if (!item) return

  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(id)
  }
}