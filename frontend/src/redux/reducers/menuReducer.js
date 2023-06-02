const menu = (state = { menu: [], toppings: [] }, action) => {
  if (action.type === "UPDATE_MENU") {
    state = { ...state, menu: action.payload };
  } else if (action.type === "UPDATE_TOPPINGS") {
    state = { ...state, toppings: action.payload };
  }
  return state;
};

export default menu;
