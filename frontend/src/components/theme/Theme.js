import React from "react";
import "./Theme.css";

export default function Theme() {
  return (
    <div className="theme">
      <div className="theme-left">
        <div className="theme-content">
          <img
            className="theme-logo"
            src="https://pizzaonline.dominos.co.in/static/assets/dominosLogoBlue.png"
            alt="Logo"
          />
          <div className="select-location-text">
            Please select location, so that we can find restaurant that delivers
            to you!
          </div>
          <div className="radio-btns">
            <input id="delivery" type="radio" name="location" />
            <label htmlFor="delivery">Delivery</label>
            <input id="pickup" type="radio" name="location" />
            <label htmlFor="pickup">Pick Up/Dine-in</label>
          </div>
          <div className="location-picker">
            <div className="location-symbol">
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/icons/location_pin.png"
                alt="Location Picker"
              />
            </div>
            <input
              className="location-text"
              placeholder="Enter your delivery address"
            />
            <div className="locate-me-btn">
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/icons/auto_detect.png"
                alt="Current Location"
              />
              LOCATE ME
            </div>
          </div>
        </div>
        <div className="delivery-img">
          <img
            src="https://pizzaonline.dominos.co.in/static/assets/home_search.png"
            alt="delivery image"
          />
        </div>
      </div>
      <div className="theme-right">
        <img
          className="google"
          src="https://api.dominos.co.in/prod-olo-api/images/flashBanner/dominos_adaptation_desktop.jpg"
          alt="Everyday Value"
        />
        <img
          className="apple"
          src="https://api.dominos.co.in/prod-olo-api/images/flashBanner/Dominos_Howzzat_IPL-2021_Pizza_Online.jpg"
          alt="IPL Offer"
        />
      </div>
    </div>
  );
}
