import React, { useEffect } from "react";
import "./UserNav.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/UserAction";
import { Link } from "react-router-dom";

export default function UserNav({ setOpenUserNav }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".user-nav-sidebar").style.right = 0;
    }, 100);
  }, []);

  function handleClose() {
    document.querySelector(".user-nav-sidebar").style.right = "-500px";
    setTimeout(() => {
      setOpenUserNav(false);
    }, 800);
  }

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  return (
    <div
      className="user-nav"
      onClick={(e) => {
        e.target.className === "user-nav" && handleClose();
      }}
    >
      <div className="user-nav-sidebar">
        <div className="user-nav-head">
          {user.email}
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO2aO0oEQRCGfx93EjNPICarBgY+pmvRhUUUQRCZA4gIxiImXTV6CXNj9QKmGmnmY8RZhEVQu7Oan/mgskk+qqcfVQV0dPyN6ACiTxC9h8RZtBqxHYjVY/GCvs2BRKZur5To7i8yowj6DNEZtDwzP0Jv4B7R7TSZJkt3cI3oEKIfidl5Q9B5uEVMkmWCvUN0BW4pNGRk5us7AZHMJtwisRgtn1QZHcAtfdtIl2liD24Jup4psw8amWAHcItUa5mZOYRbClvNk9Ej0MgEPYZbQrXcXFPS/5kTuEVsCUFfM2ROgXoCLil0MU9Gz5hkzlGWk3CJVL0sGbELxzJxIU9GI3pXU3CL2ENGZi5RXk/DNUInFMmWHN2mQLltUx6slFcfyssp5fOB8oFH+QSnLJJQlrEoC42UpWDKYj1lO4Wy4UXZkqRsGlO29SkHLyhHYyiHl74JcQvBHiF22/7xsg78yyf7rGEiZsnwHwAAAABJRU5ErkJggg=="
            onClick={() => {
              handleClose();
            }}
          />
        </div>
        <div className="user-nav-body">
          {/* <Link
            to="/trackorder"
            className="nav-options-box"
            onClick={() => {
              handleClose();
            }}
          >
            <div className="option-img">
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/icons/track_order_icon.svg"
                alt=""
              />
            </div>
            <div className="option-title">TRACK CURRENT ORDER</div>
          </Link> */}
          <Link
            to="/orderhistory"
            className="nav-options-box"
            onClick={() => {
              handleClose();
            }}
          >
            <div className="option-img">
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/icons/reorder_icon.svg"
                alt=""
              />
            </div>
            <div className="option-title">ORDER HISTORY</div>
          </Link>
          <Link
            to="/"
            className="nav-options-box"
            onClick={() => {
              handleClose();
            }}
          >
            <div className="option-img">
              <img
                src="https://pizzaonline.dominos.co.in/static/assets/icons/menu_icon.svg"
                alt=""
              />
            </div>
            <div className="option-title">MENU</div>
          </Link>
        </div>
        <div
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("dominos_token");
            dispatch(userLogout());
            handleClose();
          }}
        >
          LOGOUT
        </div>
      </div>
    </div>
  );
}
