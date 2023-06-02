import React, { useEffect } from "react";
import "./Customize.css";
import { useSelector } from "react-redux";

export default function Customize({
  item,
  setOpenCustomization,
  size,
  setSize,
  crust,
  setCrust,
  sizes,
  crusts,
  price,
  addExtraCheese,
  setAddExtraCheese,
  toppings,
  setToppings,
  toppingsPrice,
  setToppingsPrice,
  addItem,
}) {
  const dominosToppings = useSelector((state) => state.menu.toppings);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".customization-sidebar").style.left = 0;
    }, 100);
  }, []);

  function handleClose() {
    document.querySelector(".customization-sidebar").style.left = "-600px";
    setTimeout(() => {
      setOpenCustomization(false);
    }, 800);
  }

  return (
    <div
      className="customization-page"
      onClick={(e) => {
        e.target.className === "customization-page" && handleClose();
      }}
    >
      <div className="customization-sidebar">
        <div className="customization-body">
          <div className="customization-img">
            <img src={item.image_url} className="customization-img-img"></img>
            <img
              className="customization-veg-nonveg"
              src={
                item.is_veg
                  ? "https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                  : "https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
              }
              alt="Veg / Non-veg"
            />
            <div className="customization-img-price">₹ {price}</div>
            <div className="customization-back-btn">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO2aO0oEQRCGfx93EjNPICarBgY+pmvRhUUUQRCZA4gIxiImXTV6CXNj9QKmGmnmY8RZhEVQu7Oan/mgskk+qqcfVQV0dPyN6ACiTxC9h8RZtBqxHYjVY/GCvs2BRKZur5To7i8yowj6DNEZtDwzP0Jv4B7R7TSZJkt3cI3oEKIfidl5Q9B5uEVMkmWCvUN0BW4pNGRk5us7AZHMJtwisRgtn1QZHcAtfdtIl2liD24Jup4psw8amWAHcItUa5mZOYRbClvNk9Ej0MgEPYZbQrXcXFPS/5kTuEVsCUFfM2ROgXoCLil0MU9Gz5hkzlGWk3CJVL0sGbELxzJxIU9GI3pXU3CL2ENGZi5RXk/DNUInFMmWHN2mQLltUx6slFcfyssp5fOB8oFH+QSnLJJQlrEoC42UpWDKYj1lO4Wy4UXZkqRsGlO29SkHLyhHYyiHl74JcQvBHiF22/7xsg78yyf7rGEiZsnwHwAAAABJRU5ErkJggg=="
                onClick={() => {
                  handleClose();
                }}
              />
            </div>
          </div>
          <div className="customization-product">
            <div className="customization-product-name">{item.name}</div>
            <div className="customization-product-desc">{item.desc}</div>
          </div>
          <div className="customization-options">
            <div className="customization-option">
              <div className="customization-option-title">Select Size</div>
              <div className="customization-size">
                {sizes.map((size_type, index) => (
                  <div
                    key={index}
                    className={
                      size_type.sizeType === size
                        ? "size-box focused"
                        : "size-box"
                    }
                    onClick={() => {
                      setSize(size_type.sizeType);
                    }}
                  >
                    <img
                      src={
                        size_type.sizeType === size
                          ? size_type.focusedImgUrl
                          : size_type.imgUrl
                      }
                      alt="Size Type Img"
                    />
                    <div className="prod-size-desc">
                      <div className="prod-size-name">{size_type.sizeType}</div>
                      <div className="prod-size-serve">{size_type.serves}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="customization-option">
              <div className="customization-option-title">Select Crust</div>
              <div className="customization-crust">
                {crusts.map((crust_type, index) => (
                  <div
                    key={index}
                    className={
                      crust_type.crustType === crust
                        ? "crust-box focused"
                        : "crust-box"
                    }
                    onClick={() => {
                      setCrust(crust_type.crustType);
                    }}
                  >
                    <div className="prod-crust-desc">
                      <div className="prod-crust-name">
                        {crust_type.crustType}
                      </div>
                      <div
                        className={
                          crust_type.crustType === crust
                            ? "prod-crust-price prod-price-focused"
                            : "prod-crust-price"
                        }
                      >
                        ₹
                        {
                          item.size[size].filter(
                            (x) => x.crust === crust_type.crustType
                          )[0].price
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="customization-option">
              <div className="customization-option-title">Extra Cheese</div>
              <div className="customization-cheese">
                <div
                  className={
                    addExtraCheese ? "cheese-box focused" : "cheese-box"
                  }
                  onClick={() => {
                    setAddExtraCheese(!addExtraCheese);
                    if (addExtraCheese) {
                      setToppingsPrice(toppingsPrice - 75);
                    } else {
                      setToppingsPrice(toppingsPrice + 75);
                    }
                  }}
                >
                  <div
                    className={
                      addExtraCheese
                        ? "add-cheese-text-focused"
                        : "add-cheese-text"
                    }
                  >
                    I want to add extra cheese
                  </div>
                  <div
                    className={
                      addExtraCheese
                        ? "cheese-price cheese-price-focused"
                        : "cheese-price"
                    }
                  >
                    ₹75
                  </div>
                  {!addExtraCheese && <div className="add-cheese-btn">ADD</div>}
                  {addExtraCheese && (
                    <div className="add-cheese-btn remove-cheese-btn">
                      REMOVE
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="prod-add-toppings">
              <div className="toppings-text customization-option-title">
                Add Toppings
              </div>
              <div className="prod-add-topping-text">
                You can add more toppings
              </div>
              <div className="separator"></div>
              <div className="toppings-box">
                <div className="toppings-header">
                  <img
                    src="https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                    alt="veg"
                  />
                  <div className="toppings-title">
                    Add Veg Toppings @ ₹60.00 each
                  </div>
                </div>
                <div className="toppings-body">
                  {dominosToppings
                    .filter((x) => x.is_veg === true)
                    .map((item, index) => (
                      <div key={index} className="toppings-item-box">
                        <img src={item.image_url} alt="" />
                        <div className="topping-item-name">{item.name}</div>
                        {!toppings.includes(item._id) && (
                          <div
                            className="add-topping-btn"
                            onClick={() => {
                              setToppings([...toppings, item._id]);
                              setToppingsPrice(toppingsPrice + 60);
                            }}
                          >
                            ADD
                          </div>
                        )}
                        {toppings.includes(item._id) && (
                          <div
                            className="remove-topping-btn"
                            onClick={() => {
                              setToppings(
                                toppings.filter((x) => x !== item._id)
                              );
                              setToppingsPrice(toppingsPrice - 60);
                            }}
                          >
                            REMOVE
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div className="toppings-box">
                <div className="toppings-header">
                  <img
                    src="https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
                    alt="veg"
                  />
                  <div className="toppings-title">
                    Add Non-Veg Toppings @ ₹75.00 each
                  </div>
                </div>

                <div className="toppings-body">
                  {dominosToppings
                    .filter((x) => x.is_veg !== true)
                    .map((item, index) => (
                      <div key={index} className="toppings-item-box">
                        <img src={item.image_url} alt="" />
                        <div className="topping-item-name">{item.name}</div>
                        {!toppings.includes(item._id) && (
                          <div
                            className="add-topping-btn"
                            onClick={() => {
                              setToppings([...toppings, item._id]);
                              setToppingsPrice(toppingsPrice + 75);
                            }}
                          >
                            ADD
                          </div>
                        )}
                        {toppings.includes(item._id) && (
                          <div
                            className="remove-topping-btn"
                            onClick={() => {
                              setToppings(
                                toppings.filter((x) => x !== item._id)
                              );
                              setToppingsPrice(toppingsPrice - 75);
                            }}
                          >
                            REMOVE
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="customization-foot">
          <div>1 Item &nbsp;₹{price} </div>
          <div
            className="checkout"
            onClick={() => {
              addItem();
              handleClose();
            }}
          >
            ADD TO CART
          </div>
        </div>
      </div>
    </div>
  );
}
