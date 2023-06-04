import React, { useEffect, useState } from "react";
import "./Login.css";
import { login } from "../../api";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../redux/actions/UserAction";

export default function Login({ setOpenLogin }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".login-sidebar").style.right = 0;
    }, 100);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const features = [
    {
      name: (
        <>
          GREAT
          <br />
          FOOD
        </>
      ),
      img_url:
        "https://pizzaonline.dominos.co.in/static/assets/icons/great_food.svg",
    },
    {
      name: (
        <>
          GREAT$
          <br />
          OFFERS
        </>
      ),
      img_url:
        "https://pizzaonline.dominos.co.in/static/assets/icons/great_offers.svg",
    },
    {
      name: (
        <>
          EASY
          <br />
          REORDERING
        </>
      ),
      img_url:
        "https://pizzaonline.dominos.co.in/static/assets/icons/easy_reorder.svg",
    },
  ];

  const dispatch = useDispatch();

  async function handleLogin() {
    setLoading(true);
    const res = await login({
      email: email,
      password: password,
    });
    if (res.success) {
      localStorage.setItem("dominos_token", res.token);
      dispatch(updateUserData(res.user));
    } else {
      window.alert(res.message);
    }
    setLoading(false);
  }

  function handleClose() {
    document.querySelector(".login-sidebar").style.right = "-550px";
    setTimeout(() => {
      setOpenLogin(false);
    }, 800);
  }

  return (
    <div
      className="login-page"
      onClick={(e) => {
        e.target.className === "login-page" && handleClose();
      }}
    >
      <div className="login-sidebar">
        <div className="login-back-btn" onClick={() => handleClose()}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO2aO0oEQRCGfx93EjNPICarBgY+pmvRhUUUQRCZA4gIxiImXTV6CXNj9QKmGmnmY8RZhEVQu7Oan/mgskk+qqcfVQV0dPyN6ACiTxC9h8RZtBqxHYjVY/GCvs2BRKZur5To7i8yowj6DNEZtDwzP0Jv4B7R7TSZJkt3cI3oEKIfidl5Q9B5uEVMkmWCvUN0BW4pNGRk5us7AZHMJtwisRgtn1QZHcAtfdtIl2liD24Jup4psw8amWAHcItUa5mZOYRbClvNk9Ej0MgEPYZbQrXcXFPS/5kTuEVsCUFfM2ROgXoCLil0MU9Gz5hkzlGWk3CJVL0sGbELxzJxIU9GI3pXU3CL2ENGZi5RXk/DNUInFMmWHN2mQLltUx6slFcfyssp5fOB8oFH+QSnLJJQlrEoC42UpWDKYj1lO4Wy4UXZkqRsGlO29SkHLyhHYyiHl74JcQvBHiF22/7xsg78yyf7rGEiZsnwHwAAAABJRU5ErkJggg==" />
        </div>
        <img
          src="https://pizzaonline.dominos.co.in/static/assets/login_pizza_image@2x.png"
          alt="Pizza Image"
          className="pizza-img"
        />
        <img
          src="https://pizzaonline.dominos.co.in/static/assets/Dominos_logo.svg"
          alt="Logo"
          className="login-logo"
        />
        <div className="adv-section">
          <div className="adv-text">
            <b>Login</b> to unlock awesome new features
          </div>
          <div className="img-content">
            {features.map((feature, index) => (
              <div key={index} className="features">
                <img src={feature.img_url} alt="" className="feature-img" />
                <div className="feature-text">{feature.name}</div>
              </div>
            ))}
          </div>
        </div>

        <form
          className="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleLogin();
            handleClose();
          }}
        >
          <div className="login-form-title">Login with your valid Email Id</div>
          <input
            id="login-email"
            className="login-input"
            placeholder="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            id="login-password"
            className="login-input"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="login-submit-outer">
            {!loading && (
              <input type="submit" value="SUBMIT" className="login-submit" />
            )}
            {loading && (
              <div className="login-submit">
                <div className="loader"></div>
              </div>
            )}
          </div>
        </form>
        <div className="login-form">
          <div className="login-form-title">Login with social account</div>
          <div className="google-btn">
            <img src="https://pizzaonline.dominos.co.in/static/assets/icons/gmail.svg"></img>{" "}
            GOOGLE
          </div>
        </div>
      </div>
    </div>
  );
}
