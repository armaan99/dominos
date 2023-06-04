export function updateUserData(user) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  };
}

export function userLogout() {
  return async function (dispatch) {
    dispatch({
      type: "USER_LOGOUT",
    });
  };
}
