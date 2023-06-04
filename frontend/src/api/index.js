import axios from "axios";

// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = "/api";
const LOGIN_URL = BASE_URL + "/auth/login";
const VALIDATE_TOKEN_URL = BASE_URL + "/auth/validate_token";
const MENU_URL = BASE_URL + "/menu";
const TOPPINGS_URL = BASE_URL + "/toppings";
const CART_URL = BASE_URL + "/cart/";

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

export async function fetchToppings() {
  try {
    const res = await axios.get(TOPPINGS_URL);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addItemToCart(item) {
  try {
    const token = localStorage.getItem("dominos_token");
    const res = await axios.post(CART_URL + token, item);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchCartItems() {
  try {
    const token = localStorage.getItem("dominos_token");
    const res = await axios.get(CART_URL + token);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateCartItem(qty, cartItemId) {
  try {
    const token = localStorage.getItem("dominos_token");
    const res = await axios.put(CART_URL + token, {
      qty: qty,
      cartItemId: cartItemId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
