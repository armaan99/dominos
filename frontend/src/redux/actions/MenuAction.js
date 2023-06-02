export function updateMenuData(menu) {
  const data = [
    ...menu.pizza,
    ...menu.beverages,
    ...menu.chicken,
    ...menu.combos,
    ...menu.dessert,
    ...menu.mania,
    ...menu.sides,
  ];
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_MENU",
      payload: data,
    });
  };
}

export function updateToppings(toppings) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_TOPPINGS",
      payload: toppings,
    });
  };
}
