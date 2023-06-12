const auth = (
  state = { user: { address: [], orders: [] }, user_loggedin: false },
  action
) => {
  if (action.type === "UPDATE_USER") {
    state = { ...state, user: action.payload, user_loggedin: true };
  }
  if (action.type === "USER_LOGOUT") {
    state = { ...state, user: {}, user_loggedin: false };
  }
  if (action.type === "UPDATE_ADDRESS") {
    state = { ...state, user: { ...state.user, address: action.payload } };
  }
  return state;
};

export default auth;
