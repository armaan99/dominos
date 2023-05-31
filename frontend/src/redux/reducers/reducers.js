import { combineReducers } from "redux";

import auth from "./authReducers";

const reducers = combineReducers({
  auth,
});

export default reducers;
