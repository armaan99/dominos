import React, { useEffect, useState } from "react";

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

  const [itemCount, setItemCount] = useState(0);

  const handleIncreaseItem = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecreaseItem = () => {
    setItemCount(itemCount - 1);
    if (itemCount === 1) {
      document.getElementById(`${id}-atc-btn`).style.display = "flex";
      document.getElementById(`${id}-counter`).style.display = "none";
    }
  };

  const addItem = () => {
    setItemCount(1);
    document.getElementById(`${id}-atc-btn`).style.display = "none";
    document.getElementById(`${id}-counter`).style.display = "flex";
  };

  useEffect(() => {
    setPrice(item.size[size].filter((x) => x.crust === crust)[0].price);
  }, [size, crust]);

  return (
    <div
      className="item-card"
      onMouseLeave={() => {
        setSizeDd(false);
        setCrustDd(false);
      }}
    >
      <div className="item-img">
        <img src={item.image_url} alt="Pizza Image" />
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
                <img
                  src="	https://pizzaonline.dominos.co.in/static/assets/icons/down_arrow_filled.svg"
                  alt="Arrow"
                />
              </div>
            </div>
            {sizeDd && (
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
                <img
                  src="	https://pizzaonline.dominos.co.in/static/assets/icons/down_arrow_filled.svg"
                  alt="Arrow"
                />
              </div>
              {crustDd && (
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
        <div className="add-to-cart" id={`${id}-atc-btn`}>
          <div className="add-to-cart-btn" onClick={addItem}>
            Add to Cart
          </div>
        </div>
        <div
          className="item-counter"
          id={`${id}-counter`}
          style={{ display: "none" }}
        >
          <div className="item-count-manage-box">
            <div className="dec-item" onClick={handleDecreaseItem}>
              <img
                src="	https://pizzaonline.dominos.co.in/static/assets/icons/minus.svg"
                alt="-"
              />
            </div>
            <div className="item-count">{itemCount}</div>
            <div className="inc-item" onClick={handleIncreaseItem}>
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/icons/plus.svg"
                alt="+"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
