export const addDecimal = (num) => (Math.round(num / 100) / 100).toFixed(2);

export const updateCart = (state) => {
  state.itemsPrice = addDecimal(
    state.cartItems.reduce(
      (sum, currentItem) => (sum += currentItem.price * currentItem.quantity),
      0
    )
  );
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 100);
  state.taxPrice = addDecimal(0.15 * state.itemsPrice);
  state.totalPrice = addDecimal(
    +state.itemsPrice + +state.shippingPrice + +state.taxPrice
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
