import { combineReducers } from "redux";

import auth from "./authReducers";
import menu from "./menuReducer";
import cart from "./cartReducers";

const reducers = combineReducers({
  auth,
  menu,
  cart,
});

export default reducers;
