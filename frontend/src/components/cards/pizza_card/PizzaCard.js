import React, { useEffect, useState } from "react";
import "./PizzaCard.css";
import Customize from "../../customize/Customize";
import { addItemToCart, updateCartItem } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../redux/actions/cartAction";

export default function PizzaCard({
  item,
  id,
  openCustomization,
  setOpenCustomization,
}) {
  const sizes = [
    {
      sizeType: "Regular",
      serves: "Serves 1",
      imgUrl:
        "	https://pizzaonline.dominos.co.in/static/assets/icons/regular_serve_1.svg",
      focusedImgUrl:
        "https://pizzaonline.dominos.co.in/static/assets/icons/regular_serve_blue_1.svg",
    },
    {
      sizeType: "Medium",
      serves: "Serves 2",
      imgUrl:
        "https://pizzaonline.dominos.co.in/static/assets/icons/medium_serve_gray_2.svg",
      focusedImgUrl:
        "https://pizzaonline.dominos.co.in/static/assets/icons/medium_serve_blue_2.svg",
    },
    {
      sizeType: "Large",
      serves: "Serves 4",
      imgUrl:
        "https://pizzaonline.dominos.co.in/static/assets/icons/large_serve_gray_4.svg",
      focusedImgUrl:
        "https://pizzaonline.dominos.co.in/static/assets/icons/large_serve_blue_4.svg",
    },
  ];

  const crusts = [
    {
      crustType: "New Hand Tossed",
    },
    {
      crustType: "Cheese Burst",
    },
  ];

  const [size, setSize] = useState("Regular");
  const [crust, setCrust] = useState("New Hand Tossed");
  const [price, setPrice] = useState(
    item.size[size].filter((x) => x.crust === crust)[0].price
  );
  const [addExtraCheese, setAddExtraCheese] = useState(false);
  const [toppings, setToppings] = useState([]);
  const [toppingsPrice, setToppingsPrice] = useState(0);

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
        extra_cheese: addExtraCheese,
        toppings: toppings,
      });

      if (res.success) {
        dispatch(updateCart(res.cart));
      }
    } else {
      window.alert("Please login first");
    }
  };

  useEffect(() => {
    setPrice(
      item.size[size].filter((x) => x.crust === crust)[0].price + toppingsPrice
    );
  }, [size, crust, toppings, addExtraCheese]);

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
        {!itemInCart && (
          <div
            className="customize"
            onClick={() => {
              setOpenCustomization(id);
            }}
          >
            CUSTOMIZE
            <img
              src="https://pizzaonline.dominos.co.in/static/assets/icons/customise_arrow.svg"
              alt=""
            />
          </div>
        )}
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
          <div className="add-to-cart" id={`${id}-atc-btn`}>
            <div className="add-to-cart-btn" onClick={addItem}>
              Add to Cart
            </div>
          </div>
        ) : (
          <div className="item-counter" id={`${id}-counter`}>
            {itemInCart.extra_cheese || itemInCart.toppings.length > 0 ? (
              <div className="customized-boolean">CUSTOMIZED</div>
            ) : (
              <div />
            )}
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

      {openCustomization === id && (
        <Customize
          item={item}
          setOpenCustomization={setOpenCustomization}
          size={size}
          setSize={setSize}
          crust={crust}
          setCrust={setCrust}
          sizes={sizes}
          crusts={crusts}
          price={price}
          addExtraCheese={addExtraCheese}
          setAddExtraCheese={setAddExtraCheese}
          toppings={toppings}
          setToppings={setToppings}
          toppingsPrice={toppingsPrice}
          setToppingsPrice={setToppingsPrice}
          addItem={addItem}
        />
      )}
    </div>
  );
}
