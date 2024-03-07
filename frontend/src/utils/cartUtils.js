export const addDecimal = (num) => (Math.round(num / 100) / 100).toFixed(2);

export const updateCart = (state) => {
  state.itemsPrice = state.cartItems.reduce((sum, currentItem) => {
    return (sum = sum + +currentItem.price * +currentItem.quantity);
  }, 0);
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 100;
  state.taxPrice = addDecimal(0.15 * state.itemsPrice);
  state.totalPrice = +state.itemsPrice + +state.shippingPrice + +state.taxPrice;
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
