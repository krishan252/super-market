import { ref } from "vue"

const cart = ref<any[]>([])

export function useCart() {
  function addToCart(product: any) {
    cart.value.push(product)
  }

  function removeFromCart(id: number) {
    cart.value = cart.value.filter((item) => item.id !== id)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
  }
}