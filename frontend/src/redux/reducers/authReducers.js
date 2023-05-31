const auth = (state = { user: {}, user_loggedin: false }, action) => {
  if (action.type === "UPDATE_USER") {
    state = { ...state, user: action.payload, user_loggedin: true };
  }
  return state;
};

export default auth;
