import React, { useEffect, useState } from "react";
import "./Cart.css";
import { fetchCartItems, updateCartItem } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/actions/cartAction";

export default function Cart({ setOpenCart }) {
  const [subTotal, setSubTotal] = useState(0);

  const menu = useSelector((state) => state.menu.menu);
  const toppings = useSelector((state) => state.menu.toppings);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".cart-side-bar").style.right = 0;
    }, 100);
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    let temp = 0;
    cart.map((item) => {
      temp = temp + item.price * item.qty;
    });
    setSubTotal(temp);
  }, [cart]);

  function handleClose() {
    document.querySelector(".cart-side-bar").style.right = "-500px";
    setTimeout(() => {
      setOpenCart(false);
    }, 800);
  }

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

  return (
    <div
      className="cart-page"
      onClick={(e) => {
        e.target.className === "cart-page" && handleClose();
      }}
    >
      <div className="cart-side-bar">
        <div className="cart-sidebar-head">
          CART
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO2aO0oEQRCGfx93EjNPICarBgY+pmvRhUUUQRCZA4gIxiImXTV6CXNj9QKmGmnmY8RZhEVQu7Oan/mgskk+qqcfVQV0dPyN6ACiTxC9h8RZtBqxHYjVY/GCvs2BRKZur5To7i8yowj6DNEZtDwzP0Jv4B7R7TSZJkt3cI3oEKIfidl5Q9B5uEVMkmWCvUN0BW4pNGRk5us7AZHMJtwisRgtn1QZHcAtfdtIl2liD24Jup4psw8amWAHcItUa5mZOYRbClvNk9Ej0MgEPYZbQrXcXFPS/5kTuEVsCUFfM2ROgXoCLil0MU9Gz5hkzlGWk3CJVL0sGbELxzJxIU9GI3pXU3CL2ENGZi5RXk/DNUInFMmWHN2mQLltUx6slFcfyssp5fOB8oFH+QSnLJJQlrEoC42UpWDKYj1lO4Wy4UXZkqRsGlO29SkHLyhHYyiHl74JcQvBHiF22/7xsg78yyf7rGEiZsnwHwAAAABJRU5ErkJggg=="
            onClick={() => {
              handleClose();
            }}
          />
        </div>
        <div className="cart-sidebar-body">
          {cart.length > 0 ? (
            cart.map((item, index) => {
              let curItem = menu.filter((x) => x._id === item.item_id)[0];
              return (
                <div key={index} className="cart-item-card">
                  <div className="cart-card-section1">
                    <div className="cart-section1-left">
                      <img
                        className="item-img"
                        src={curItem.image_url}
                        alt="Item Image"
                      ></img>
                      {curItem.is_veg ? (
                        <img
                          className="cart-item-veg"
                          src="https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                          alt="Veg"
                        />
                      ) : (
                        <img
                          className="cart-item-nonveg"
                          src="https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
                          alt="Non-Veg"
                        />
                      )}
                    </div>
                    <div className="cart-section1-right">
                      <div className="cart-item-title">{curItem.name}</div>
                      <div className="cart-item-desc">{curItem.desc}</div>
                      {item.size && (
                        <div className="cart-item-size">
                          {item.size} | {item.crust}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="cart-card-section2">
                    <div>
                      <div className="item-count-manage-box">
                        <div
                          className="dec-item"
                          onClick={() => handleDecreaseItem(item)}
                        >
                          <img
                            src="	https://pizzaonline.dominos.co.in/static/assets/icons/minus.svg"
                            alt="-"
                          />
                        </div>
                        <div className="item-count">{item.qty}</div>
                        <div
                          className="inc-item"
                          onClick={() => handleIncreaseItem(item)}
                        >
                          <img
                            src="https://pizzaonline.dominos.co.in/static/assets/icons/plus.svg"
                            alt="+"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-price">
                      ₹ {item.price * item.qty}
                    </div>
                  </div>
                  {(item.extra_cheese || item.toppings.length > 0) && (
                    <div className="cart-card-section3">
                      <div className="cart-customization-head">
                        You Customization
                      </div>
                      <div className="cart-customization-details">
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
              );
            })
          ) : (
            <div className="empty-cart">
              <img
                className="empty-cart-img"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADWElEQVR4nO2dO4tTURDHB/GBFj7wEyjY+GjFwm+wrdYq3DNxkS22sU2v2cWgKFYqmjlJSsFV8FVpIVi5tpJaRNj1LdHIMbKFj5vNvdc7c87MDwYCW2Re5+b+/+FuAAzDMAzDMAzDMJBeg/Nv1wJpCOhH+UGvoNncYM2rAvRfJzf8r0OYqeT91YP0pdAAnL+jvneV4OhzwRPwHRqdfdUkoRlHH4sNIJwCOsedfvwgfSg+gPChfXsbdwlxg/594QGEyPxJ7hLixtG7UgNAes5dQtycuLYTZju71uL3S4qjs+UGlHA4//T/D+jMjd2A/hN7sSgwGnQMagH9dfZiUVwMoPl4Yz0DaHQOCyh4JCoczUOtID1jLxqlBK0C9nfUPIDuKf7CvZRoQe3M97eC828EFD/iDRpC1t8DLCCd52+A544esDHb2QvOfxPQhBFbZN0jwArSEnsTkCvoCW/zxwOY4W+ET1x45RG+igxfSXI3A1MWXpPQ6A+5uoVXHur8IWIQXpPQ5Q+1QBxq/CFiFF6T0OEP9UAsGvyhjFt4qfaHSIDw0uwPNSQIL73+0ECO8NLoDzlJwkudP0QChZcuf6gF0ZGMP0SChZcOf6gH0ZKCP5RJFl7J+0MUgfBK2R9qxCC80vWHBvEIrxT9IReT8JoE+sW4mu9XYO7mdkgGpHvsTcXUhde/CLdx/A0dpS+80tn+HiRDdNvvIxdehba/c5Q7zTRZz/Y7f5c7zXSx7WfEtp8Z235GbPuZse1nxLafmfhU72jqEEuMqhdTGoCG7UepA9Cy/Sh1AFq2HyUOQNP2o8QBaNp+lDYAbduP0gZgGIZhGHngrUOAvg3ol3/9V94Qy4B0AU53D7I3T3p+hZlb2gJIl/Mf2KMhOH8Jjvc3W37VN//RFLd3D2sdgvT8SuP8lenvsemi5VfVNbXQc8I0hIwOgPb8SjP+QCuqNBfV51caRy8LD8DRC9CeH+/vD9Cq+vxK8/Op8qIb5ldAe37JH3EnPL/SBAVZvMAF9fmVJsj3df384R/X/yE0+vtBe36VEOyF6U9A2/KriiDbHT2YYrvuA17dVNsApOdXWZHBXsg97hT+1mYpTnp+lRHke1C44Q4iaIRxhNcLIq6p0vMzDMMwDMMwDANS4wdEdjWbqsJ+RAAAAABJRU5ErkJggg=="
              ></img>
              <div className="empty-cart-label">Your Cart is Empty</div>
            </div>
          )}
        </div>
        {cart.length !== 0 && (
          <div className="cart-sidebar-foot">
            <div className="subtotal">Subtotal: ₹{subTotal}</div>
            <div
              className="checkout"
              onClick={() => {
                handleClose();
              }}
            >
              CHECKOUT
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
