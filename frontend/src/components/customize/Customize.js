import React, { useEffect } from "react";
import "./Customize.css";

export default function Customize({
  item,
  setOpenCustomization,
  size,
  setSize,
  crust,
  setCrust,
  sizes,
  crusts,
}) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".customization-sidebar").style.left = 0;
    }, 100);
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
          <div className="prod-price">
            ₹{item.size[size].filter((x) => x.crust === crust)[0].price}
          </div>
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
        </div>
      </div>
    </div>
  );
}
