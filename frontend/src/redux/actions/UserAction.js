export function updateUserData(user) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  };
}
