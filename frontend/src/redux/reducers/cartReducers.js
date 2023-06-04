const cart = (state = { cart: [] }, action) => {
  if (action.type === "UPDATE_CART") {
    state = { ...state, cart: action.payload };
  }
  if (action.type === "USER_LOGOUT") {
    state = { ...state, cart: [] };
  }
  return state;
};

export default cart;
