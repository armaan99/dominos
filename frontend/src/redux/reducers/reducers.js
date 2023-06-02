import { combineReducers } from "redux";

import auth from "./authReducers";
import menu from "./menuReducer";

const reducers = combineReducers({
  auth,
  menu,
});

export default reducers;
