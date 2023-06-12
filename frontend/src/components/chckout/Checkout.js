import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  orderCheckout,
  updateAddress,
  updateCartItem,
} from "../../api/index";
import { updateCart } from "../../redux/actions/cartAction";
import { updateUserAddress } from "../../redux/actions/UserAction";

import { RAZORPAY_URL } from "../../api/index";

export default function Checkout() {
  const cart = useSelector((state) => state.cart.cart);
  const menu = useSelector((state) => state.menu.menu);
  const toppings = useSelector((state) => state.menu.toppings);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleIncreaseItem = async (item) => {
    const res = await updateCartItem(item.qty + 1, item._id);
    if (res.success) {
      dispatch(updateCart(res.cart));
    }
  };

  const handleDecreaseItem = async (item) => {
    const res = await updateCartItem(item.qty - 1, item._id);
    if (res.success) {
      dispatch(updateCart(res.cart));
    }
  };

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (cart.length === 0) {
      window.location.href = "/";
    }
    let t = 0;
    cart.map((item) => {
      t = t + item.price * item.qty;
    });
    setSubTotal(t);
  }, [cart]);

  const [addressForm, setAddressForm] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  async function handleAddAddress() {
    const res = await updateAddress(address, city, state);
    if (res.success) {
      dispatch(updateUserAddress(res.address));
      setSelectedAddress(res.address[res.address.length - 1]);
      setAddress("");
      setCity("");
      setState("");
      setAddressForm(false);
    }
  }

  async function handleAddressDelete(addressId) {
    const res = await deleteAddress(addressId);
    if (res.success) {
      dispatch(updateUserAddress(res.address));
    }
  }
  const [selectedAddress, setSelectedAddress] = useState();

  async function handlePlaceOrder() {
    const token = localStorage.getItem("dominos_token");
    if (selectedAddress) {
      const res = await orderCheckout(Math.floor(1.2 * subTotal), cart);
      console.log(res);
      const options = {
        key: "rzp_test_yMZpHTW51eVzSm",
        amount: res.order.amount,
        currency: "INR",
        name: "Dominos Clone",
        description: "",
        order_id: res.order.id,
        callback_url: RAZORPAY_URL + "/" + token + "/" + res.id,
        prefill: {
          name: "User",
          email: "",
          contact: "9999999999",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      alert("Please select delivery address");
    }
  }

  return (
    <div className="checkout-pg">
      <div className="checkout-cart">
        {cart.map((item, index) => {
          let curItem = menu.filter((x) => x._id === item.item_id)[0];
          return (
            <div className="checkout-cart-card" key={index}>
              <div className="checkout-cart-left">
                <img
                  className="checkout-item-img"
                  src={curItem.image_url}
                  alt=""
                />
                {curItem.is_veg ? (
                  <img
                    className="checkout-veg"
                    src="https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                    alt="Veg"
                  />
                ) : (
                  <img
                    className="checkout-non-veg"
                    src="https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
                    alt="Non-Veg"
                  />
                )}
              </div>
              <div className="checkout-cart-right">
                <div className="right-upper">
                  <div className="right-upper-left">
                    <div className="checkout-item-title">{curItem.name}</div>
                    <div className="checkout-item-desc">{curItem.desc}</div>
                    {curItem.size && (
                      <div className="checkout-size-crust">
                        {item.size} | {item.crust}
                      </div>
                    )}
                  </div>
                  <div className="right-upper-right">
                    <div className="checkout-price">
                      ₹ {item.price * item.qty}
                    </div>
                    <div className="checkout-qty">
                      <div className="item-count-manage-box">
                        <div
                          className="dec-item"
                          onClick={() => {
                            handleDecreaseItem(item);
                          }}
                        >
                          <img
                            src="	https://pizzaonline.dominos.co.in/static/assets/icons/minus.svg"
                            alt="-"
                          />
                        </div>
                        <div className="item-count">{item.qty}</div>
                        <div
                          className="inc-item"
                          onClick={() => {
                            handleIncreaseItem(item);
                          }}
                        >
                          <img
                            src="https://pizzaonline.dominos.co.in/static/assets/icons/plus.svg"
                            alt="+"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {(item.extra_cheese || item.toppings.length > 0) && (
                  <div className="right-lower">
                    <div className="checkout-customization-text">
                      You Customization
                    </div>
                    <div className="checkout-customizations">
                      <b>Added Toppings: </b>
                      {item.extra_cheese && "Extra Cheese"}
                      {item.extra_cheese && item.toppings.length > 0 && ", "}
                      {item.toppings.length > 0 &&
                        item.toppings.map((topping, index) => {
                          const data = toppings.filter(
                            (x) => x._id === topping
                          )[0];
                          return (
                            <span key={index}>
                              {data.name}
                              {index !== item.toppings.length - 1 && ", "}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout-details">
        <div className="address-details">
          <div className="address-details-head">Choose a delivery address</div>
          <div className="address-details-body">
            {user.address.length > 0 && (
              <div className="address-list">
                {user.address.map((item, index) => (
                  <div
                    className={
                      selectedAddress === item
                        ? "address-item-selected"
                        : "address-item"
                    }
                    key={index}
                    onClick={() => {
                      setSelectedAddress(item);
                    }}
                  >
                    <img src="https://pizzaonline.dominos.co.in/static/assets/icons/location_pin.png"></img>
                    <div className="address-item-text">
                      {item.address},<br />
                      {item.city}, {item.state}
                    </div>
                    <div
                      className="delete-address-btn"
                      onClick={() => {
                        handleAddressDelete(item._id);
                      }}
                    >
                      <img src="https://pizzaonline.dominos.co.in/static/assets/icons/delete_icon.svg"></img>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div
              onClick={() => {
                setAddressForm(!addressForm);
              }}
              className="pdb-item-title address-title"
            >
              Add a new address
            </div>
            {addressForm && (
              <form
                className="new-address-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddAddress();
                }}
              >
                <input
                  placeholder="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
                <input
                  placeholder="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                ></input>
                <input
                  placeholder="State"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                ></input>
                <input type="submit" value="Add"></input>
              </form>
            )}
          </div>
        </div>
        <div className="price-details">
          <div className="price-details-head">Price Details</div>
          <div className="price-details-body">
            <div className="pdb-item">
              <div className="pdb-item-title">Sub Total</div>
              <div className="pdb-item-value">{subTotal}</div>
            </div>
            <div className="pdb-item">
              <div className="pdb-item-title">Taxs and Charges</div>
              <div className="pdb-item-value">{Math.floor(0.2 * subTotal)}</div>
            </div>
            <div className="pdb-item grand-total">
              <div className="pdb-item-title">Grand Total</div>
              <div className="pdb-item-value">{Math.floor(1.2 * subTotal)}</div>
            </div>
            <div
              className="place-order-btn"
              onClick={() => {
                handlePlaceOrder();
              }}
            >
              Place Order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
