import React, { useEffect, useState } from "react";
import "./Cart.css";
import { fetchCartItems } from "../../api";
import { useSelector } from "react-redux";

export default function Cart({ setOpenCart }) {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  async function getCartItems() {
    const res = await fetchCartItems();
    setCart(res.cart);
  }

  const menu = useSelector((state) => state.menu.menu);
  const toppings = useSelector((state) => state.menu.toppings);
  // const { menu, toppings } = useSelector((state) => state.menu);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".cart-side-bar").style.right = 0;
    }, 100);
    getCartItems();
  }, []);

  useEffect(() => {
    let temp = 0;
    cart.map((item) => {
      temp = temp + item.price;
    });
    setSubTotal(temp);
  }, [cart]);

  return (
    <div
      className="cart-page"
      onClick={(e) => {
        if (e.target.className === "cart-page") {
          document.querySelector(".cart-side-bar").style.right = "-500px";
          setTimeout(() => {
            setOpenCart(false);
          }, 800);
        }
      }}
    >
      <div className="cart-side-bar">
        <div className="cart-sidebar-head">
          CART
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO2aO0oEQRCGfx93EjNPICarBgY+pmvRhUUUQRCZA4gIxiImXTV6CXNj9QKmGmnmY8RZhEVQu7Oan/mgskk+qqcfVQV0dPyN6ACiTxC9h8RZtBqxHYjVY/GCvs2BRKZur5To7i8yowj6DNEZtDwzP0Jv4B7R7TSZJkt3cI3oEKIfidl5Q9B5uEVMkmWCvUN0BW4pNGRk5us7AZHMJtwisRgtn1QZHcAtfdtIl2liD24Jup4psw8amWAHcItUa5mZOYRbClvNk9Ej0MgEPYZbQrXcXFPS/5kTuEVsCUFfM2ROgXoCLil0MU9Gz5hkzlGWk3CJVL0sGbELxzJxIU9GI3pXU3CL2ENGZi5RXk/DNUInFMmWHN2mQLltUx6slFcfyssp5fOB8oFH+QSnLJJQlrEoC42UpWDKYj1lO4Wy4UXZkqRsGlO29SkHLyhHYyiHl74JcQvBHiF22/7xsg78yyf7rGEiZsnwHwAAAABJRU5ErkJggg=="
            onClick={() => {
              document.querySelector(".cart-side-bar").style.right = "-500px";
              document.querySelector(".cart-sidebar-head").style.right =
                "-500px";
              setTimeout(() => {
                setOpenCart(false);
              }, 800);
            }}
          />
        </div>
        <div className="cart-sidebar-body">
          {cart.map((item, index) => {
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
                    <div className="cart-item-size">
                      {item.size} | {item.crust}
                    </div>
                  </div>
                </div>
                <div className="cart-card-section2">
                  <div>
                    <div className="item-count-manage-box">
                      <div className="dec-item">
                        <img
                          src="	https://pizzaonline.dominos.co.in/static/assets/icons/minus.svg"
                          alt="-"
                        />
                      </div>
                      <div className="item-count">{item.qty}</div>
                      <div className="inc-item">
                        <img
                          src="https://pizzaonline.dominos.co.in/static/assets/icons/plus.svg"
                          alt="+"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-price">₹ {item.price}</div>
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
          })}
        </div>
        <div className="cart-sidebar-foot">
          <div className="subtotal">Subtotal: ₹{subTotal}</div>
          <div className="checkout">CHECKOUT</div>
        </div>
      </div>
    </div>
  );
}
