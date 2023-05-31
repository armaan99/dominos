import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const LOGIN_URL = BASE_URL + "/auth/login";
const VALIDATE_TOKEN_URL = BASE_URL + "/auth/validate_token";
const MENU_URL = BASE_URL + "/menu";

export async function login({ email, password }) {
  try {
    const res = await axios.post(LOGIN_URL, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function validateToken(token) {
  try {
    const res = await axios.post(VALIDATE_TOKEN_URL, { token: token });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchMenuItems() {
  try {
    const res = await axios.get(MENU_URL);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
