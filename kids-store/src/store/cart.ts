import { ref } from "vue"

const cart = ref<any[]>([])

export function useCart() {
  function addToCart(product: any) {
    const existing = cart.value.find((item) => item.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(id: number) {
    cart.value = cart.value.filter((item) => item.id !== id)
  }

  function increaseQuantity(id: number) {
    const item = cart.value.find((item) => item.id === id)
    if (item) item.quantity += 1
  }

  function decreaseQuantity(id: number) {
    const item = cart.value.find((item) => item.id === id)
    if (item && item.quantity > 1) {
      item.quantity -= 1
    } else {
      removeFromCart(id)
    }
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }
}