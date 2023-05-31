import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-inner-block">
          <div className="footer-left">
            <div className="footer-logo">
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/logo_white.svg"
                alt="Logo"
              />
            </div>
            <div className="footer-nav">
              <div>Disclaimer</div>
              <div>Privacy Policy</div>
              <div>Faq</div>
              <div>Terms & Conditions</div>
              <div>Feedback</div>
            </div>
          </div>
          <div className="footer-right">
            <div className="download-text">DOWNLOAD APP</div>
            <div className="get-app-images">
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/play_store@2x.png"
                alt="Google Play"
              />
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/app_store@2x.png"
                alt="Apple Store"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        All Rights Reserved. Copyright © Armaan and Vardaan
      </div>
    </div>
  );
}
