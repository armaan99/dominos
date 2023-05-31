import React, { useState } from "react";
import "./Navbar.css";
import Login from "../login/Login";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);

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

      {openLogin && <Login setOpenLogin={setOpenLogin} />}
    </div>
  );
}
