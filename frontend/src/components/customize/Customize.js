import React, { useEffect, useState } from "react";
import "./Customize.css";
// import { dominos_toppings } from "../../data/dominosToppings";
import { fetchToppings } from "./../../api/index";

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
}) {
  const [dominosToppings, setDominosToppings] = useState([]);

  async function getToppings() {
    const res = await fetchToppings();
    setDominosToppings(res.data);
  }

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".customization-sidebar").style.left = 0;
    }, 100);
    getToppings();
  }, []);

  return (
    <div
      className="customization-page"
      onClick={(e) => {
        if (e.target.className === "customization-page") {
          document.querySelector(".customization-sidebar").style.left =
            "-600px";
          setTimeout(() => {
            setOpenCustomization(false);
          }, 800);
        }
      }}
    >
      <div className="customization-sidebar">
        <div className="prod-img-content">
          <img className="prod-img" src={item.image_url} alt="" />
          <img
            className="prod-veg-nonveg"
            src={
              item.is_veg
                ? "https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                : "https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
            }
            alt="Veg / Non-veg"
          />
          <div className="prod-price">₹ {price + toppingsPrice}</div>
        </div>
        <div className="prod-details">
          <div className="prod-title">{item.name}</div>
          <div className="prod-desc">{item.desc}</div>
        </div>
        <div className="prod-customize-block">
          <div className="prod-size">
            <div className="size-text">Select Size</div>
            <div className="size-selector">
              <div className="prod-size-options">
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
          </div>

          <div className="prod-crust">
            <div className="crust-text">Select Crust</div>
            <div className="crust-selector">
              <div className="prod-crust-options">
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
          </div>

          <div className="prod-extra-cheese">
            <div className="cheese-text">Extra Cheese</div>
            <div className="cheese-selector">
              <div
                className={addExtraCheese ? "cheese-box focused" : "cheese-box"}
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
                  <div className="remove-cheese-btn">REMOVE</div>
                )}
              </div>
            </div>
          </div>

          <div className="prod-add-toppings">
            <div className="toppings-text">Add Toppings</div>
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
                      {!toppings.includes(item) && (
                        <div
                          className="add-topping-btn"
                          onClick={() => {
                            setToppings([...toppings, item]);
                            setToppingsPrice(toppingsPrice + 60);
                          }}
                        >
                          ADD
                        </div>
                      )}
                      {toppings.includes(item) && (
                        <div
                          className="remove-topping-btn"
                          onClick={() => {
                            setToppings(toppings.filter((x) => x !== item));
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
                      {!toppings.includes(item) && (
                        <div
                          className="add-topping-btn"
                          onClick={() => {
                            setToppings([...toppings, item]);
                            setToppingsPrice(toppingsPrice + 75);
                          }}
                        >
                          ADD
                        </div>
                      )}
                      {toppings.includes(item) && (
                        <div
                          className="remove-topping-btn"
                          onClick={() => {
                            setToppings(toppings.filter((x) => x !== item));
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
        <div className="item-details-footer">
          <div className="final-item-details">
            <div className="final-item-count">1 Item</div>
            <div className="final-item-price">₹{price + toppingsPrice}</div>
          </div>
          <div className="item-add-to-cart">ADD TO CART</div>
        </div>
      </div>
    </div>
  );
}
