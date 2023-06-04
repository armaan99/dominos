const cart = (state = { cart: [] }, action) => {
  if (action.type === "UPDATE_CART") {
    state = { ...state, cart: action.payload };
  }
  return state;
};

export default cart;
