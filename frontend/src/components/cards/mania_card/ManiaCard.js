import React, { useEffect, useState } from "react";
import { addItemToCart, updateCartItem } from "../../../api";
import { updateCart } from "../../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

export default function ManiaCard({ item, id }) {
  const sizes = [
    {
      sizeType: "Regular",
      serves: "Serves 1",
    },
  ];

  const crusts = [
    {
      crustType: "Classic Hand Tossed",
    },
    {
      crustType: "Fresh Pan Pizza",
    },
  ];

  const [size, setSize] = useState("Regular");
  const [crust, setCrust] = useState("Classic Hand Tossed");
  const [price, setPrice] = useState(
    item.size[size].filter((x) => x.crust === crust)[0].price
  );

  const [sizeDd, setSizeDd] = useState(false);
  const [crustDd, setCrustDd] = useState(false);

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
        size: size,
        crust: crust,
        price: price,
        qty: 1,
      });

      if (res.success) {
        dispatch(updateCart(res.cart));
      }
    } else {
      window.alert("Please login first");
    }
  };

  useEffect(() => {
    setPrice(item.size[size].filter((x) => x.crust === crust)[0].price);
  }, [size, crust]);

  const cart = useSelector((state) => state.cart.cart);

  const [itemInCart, setItemInCart] = useState();

  useEffect(() => {
    setItemInCart(cart.filter((x) => x.item_id === item._id)[0]);
  }, [cart]);

  return (
    <div
      className="item-card"
      onMouseLeave={() => {
        setSizeDd(false);
        setCrustDd(false);
      }}
    >
      <div className="item-img">
        <img className="card-item-img" src={item.image_url} alt="Pizza Image" />
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
        <div className="price">₹ {price}</div>
      </div>
      <div className="item-detail">
        <div className="title">{item.name}</div>
        <div className="description">{item.desc}</div>
        <div className="dropdowns">
          <div
            className="size"
            onClick={() => {
              setSizeDd(!sizeDd);
              setCrustDd(false);
            }}
          >
            <div className="dropdown-title">Size</div>
            <div className="dropdown-selector">
              <div className="text">{size}</div>
              <div>
                {!itemInCart && (
                  <img
                    src="	https://pizzaonline.dominos.co.in/static/assets/icons/down_arrow_filled.svg"
                    alt="Arrow"
                  />
                )}
              </div>
            </div>
            {sizeDd && !itemInCart && (
              <div className="dropdown-body">
                {sizes.map((pizzaSize, index) => (
                  <div
                    key={index}
                    className="dropdown-body-item"
                    onClick={() => {
                      setSize(pizzaSize.sizeType);
                      setSizeDd(false);
                    }}
                  >
                    <div className="size-type">
                      <div className="size-name">{pizzaSize.sizeType}</div>
                      <div className="serving-count">{pizzaSize.serves}</div>
                    </div>
                    <div className="size-price">
                      ₹
                      {
                        item.size[pizzaSize.sizeType].filter(
                          (x) => x.crust === crust
                        )[0].price
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="crust"
            onClick={() => {
              setCrustDd(!crustDd);
              setSizeDd(false);
            }}
          >
            <div className="dropdown-title">Crust</div>
            <div className="dropdown-selector">
              <div className="text">{crust}</div>
              <div>
                {!itemInCart && (
                  <img
                    src="	https://pizzaonline.dominos.co.in/static/assets/icons/down_arrow_filled.svg"
                    alt="Arrow"
                  />
                )}
              </div>
              {crustDd && !itemInCart && (
                <div className="dropdown-body">
                  {crusts.map((pizzaCrust, index) => (
                    <div
                      key={index}
                      className="dropdown-body-item"
                      onClick={() => {
                        setCrust(pizzaCrust.crustType);
                        setCrustDd(false);
                      }}
                    >
                      <div className="crust-name">{pizzaCrust.crustType}</div>
                      <div className="crust-price">
                        ₹
                        {
                          item.size[size].filter(
                            (x) => x.crust === pizzaCrust.crustType
                          )[0].price
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
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
