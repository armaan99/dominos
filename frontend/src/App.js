import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Navigations from "./components/navbar/Navigations";
import FoodMenu from "./components/menu/FoodMenu";
import Theme from "./components/theme/Theme";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { validateToken } from "./api";
import { useDispatch } from "react-redux";
import { updateUserData } from "./redux/actions/UserAction";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TrackOrder from "./components/track_order/TrackOrder";
import OrderHistory from "./components/order_history/OrderHistory";
import Checkout from "./components/chckout/Checkout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    tokenValidation();
  }, []);

  async function tokenValidation() {
    const token = localStorage.getItem("dominos_token");
    if (token) {
      const res = await validateToken(token);
      if (res.success) {
        dispatch(updateUserData(res.user));
      } else {
        console.log(res.message);
      }
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Navigations />
                <FoodMenu />
              </>
            }
          ></Route>
          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/trackorder" element={<TrackOrder />}></Route>
          <Route exact path="/orderhistory" element={<OrderHistory />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Theme /> */}
      <Footer />
    </div>
  );
}

export default App;
