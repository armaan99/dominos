import React, { useState } from "react";
import "./Navbar.css";
import Login from "../login/Login";
import { useSelector } from "react-redux";
import UserNav from "../user_nav/UserNav";
import Cart from "../cart/Cart";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openUserNav, setOpenUserNav] = useState(false);

  const user_loggedin = useSelector((state) => state.auth.user_loggedin);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img
          src="https://pizzaonline.dominos.co.in/static/assets/logo_white.svg"
          alt="Nav Logo"
        />
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="cart"
          onClick={() => {
            setOpenCart(true);
          }}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC4ElEQVR4nO3du4pTYRDA8WHRFS284BMo2HhpJYVvsG0eQB8hjQ+h2cVlRVvbPIAX8NLFQrBabSW1iLDZ9crRvxz4imiT5Jzjmfm+mR8E0izMfDM5yUw4G5EQQgghhBCCe8BH4PPCo2K5D8CG+8PrAvCTZrY6CcA74EfDAjzWjr0IwPeGBfgNXNKOP3vAV5q7ox1/9oAvLQpQv2mf0s4ha8AR7dzUziFrwGHLArzVziFrwFng3MLjr0sKcLtlgUr2uo8CnQe+aWdq1PC/FyAV4ZF2pgbNgGN9FeC6drYGjXo5/IUivNHO2JA5cKbvAtzSztqQca+HnwpwEviknbkB9bb4Qu8FSEW4q529AROVw08FuAj8wreBWgFSEZ7g11T18FMBtvBraKEAG+krSW9mvQ1eyzjdD43ECof7oXnvg9cyzvZDY7HG0X6oUhu8lnGyH5qIVU72QwOxysF+aCrWFb4fGop1Be+HZmYGL6f7oZHkosD90Nzc4OVsPzSW3BS0H6rMDl5O9kMTyVUh+6GB5KqA/dBUcpf5fmgouct4PzTLZvAqdD80klIAO+TlADgtpQCekZexlKL+GEdeqiwHr4K6fyKlyLD78x68Gnb/De04i7Ri9z/VjrNY0f2KovuVRfcriu5XFt2vKLpfWYZT79rEqkyn3rWJVR66vyYWeen+mljkpftrYo2n7q+JNZ66vyaWeOv+mvaZhxBCCCsDrgG7wLv0X3mP0vN7wFXto7QeX2PACeDBkhv2KuA+sBnxdX/4r1jdyz6LYD2+1oCHrG8v4uvumtrkPuEKuOI9vtbSG1pTO97jaw143yLBfe/xaf/+wNx7fK2lu8qbOvAeX/EvcYzH11qaIJva9h5fa/X4vuLPH/6r/pvL3uPrRFovrGs34uuuAJvAizUO/zlwvMcCmI6vyyT3lrzcqzQY9Z6c9fg6U4/v6T7h/fQZ/DA937ZwTbUeXwghhBBCCEGK8wfFaoKVvVQKWQAAAABJRU5ErkJggg==" />
        </div>
        {!user_loggedin && (
          <div
            className="account"
            onClick={() => {
              setOpenLogin(true);
            }}
          >
            <img
              src="https://pizzaonline.dominos.co.in/static/assets/avatar.svg"
              alt="Profile Image"
            />
            <div className="account-content">
              <div className="my-account">MY ACCOUNT</div>
              <div className="login">Login | Signup</div>
            </div>
          </div>
        )}

        {user_loggedin && (
          <div className="account">
            <img
              src="https://pizzaonline.dominos.co.in/static/assets/avatar.svg"
              alt="Profile Image"
            />
            <div className="account-content">
              <div className="my-account">{user.email}</div>
            </div>
          </div>
        )}
      </div>

      {openLogin && <Login setOpenLogin={setOpenLogin} />}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openUserNav && <UserNav setOpenUserNav={setOpenUserNav} />}
    </div>
  );
}
