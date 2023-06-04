export function updateCart(cart) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_CART",
      payload: cart,
    });
  };
}
