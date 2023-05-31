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
      <Navbar />
      <Navigations />
      <FoodMenu />
      {/* <Theme /> */}
      <Footer />
    </div>
  );
}

export default App;
