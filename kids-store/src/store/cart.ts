import { ref } from "vue"

const cart = ref<any[]>([])

export function useCart() {
  function addToCart(product: any) {
    cart.value.push(product)
  }

  return {
    cart,
    addToCart,
  }
}