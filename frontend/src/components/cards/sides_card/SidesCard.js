import React, { useEffect, useState } from "react";
import { addItemToCart, updateCartItem } from "../../../api";
import { updateCart } from "../../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

export default function SidesCard({ item, id }) {
  const handleIncreaseItem = async () => {
    const res = await updateCartItem(itemInCart.qty + 1, itemInCart._id);
    if (res.success) {
      dispatch(updateCart(res.cart));
    }
  };

  const handleDecreaseItem = async () => {
    const res = await updateCartItem(itemInCart.qty - 1, itemInCart._id);
    if (res.success) {
      dispatch(updateCart(res.cart));
    }
  };

  const dispatch = useDispatch();

  const user_loggedin = useSelector((state) => state.auth.user_loggedin);

  const addItem = async () => {
    if (user_loggedin) {
      const res = await addItemToCart({
        item_id: item._id,
        price: item.price,
        qty: 1,
      });

      if (res.success) {
        dispatch(updateCart(res.cart));
      }
    } else {
      window.alert("Please login first");
    }
  };

  const cart = useSelector((state) => state.cart.cart);

  const [itemInCart, setItemInCart] = useState();

  useEffect(() => {
    setItemInCart(cart.filter((x) => x.item_id === item._id)[0]);
  }, [cart]);

  return (
    <div className="item-card">
      <div className="item-img">
        <img className="card-item-img" src={item.image_url} alt="Sides Image" />
        <div className="veg-nonveg">
          <img
            src={
              item.is_veg
                ? "https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                : "https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
            }
            alt=""
          />
        </div>
        <div className="price">₹ {item.price}</div>
      </div>
      <div className="item-detail">
        <div className="title">{item.name}</div>
        <div className="description">{item.desc}</div>

        {!itemInCart ? (
          <div className="add-to-cart">
            <div className="add-to-cart-btn" onClick={addItem}>
              Add to Cart
            </div>
          </div>
        ) : (
          <div className="item-counter">
            <div />
            <div className="item-count-manage-box">
              <div className="dec-item" onClick={handleDecreaseItem}>
                <img
                  src="	https://pizzaonline.dominos.co.in/static/assets/icons/minus.svg"
                  alt="-"
                />
              </div>
              <div className="item-count">{itemInCart.qty}</div>
              <div className="inc-item" onClick={handleIncreaseItem}>
                <img
                  src="https://pizzaonline.dominos.co.in/static/assets/icons/plus.svg"
                  alt="+"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
