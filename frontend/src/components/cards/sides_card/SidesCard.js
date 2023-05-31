import React, { useState } from "react";

export default function SidesCard({ item, id }) {
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

  return (
    <div className="item-card">
      <div className="item-img">
        <img
          //   src="	https://images.dominos.co.in/Stuffed_garlic_Bread.png"
          src={item.image_url}
          alt="Sides Image"
        />
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
