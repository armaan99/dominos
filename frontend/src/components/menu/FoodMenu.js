import React, { useState, useEffect } from "react";
import "./FoodMenu.css";
import PizzaCard from "../cards/pizza_card/PizzaCard";
import SidesCard from "../cards/sides_card/SidesCard";
import ManiaCard from "../cards/mania_card/ManiaCard";
import { fetchCartItems, fetchMenuItems, fetchToppings } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateMenuData, updateToppings } from "../../redux/actions/MenuAction";
import { updateCart } from "../../redux/actions/cartAction";

export default function FoodMenu() {
  const [menu, setMenu] = useState({
    pizza: [],
    beverages: [],
    sides: [],
    chicken: [],
    mania: [],
    combos: [],
    dessert: [],
  });

  useEffect(() => {
    fetchMenu();
    getToppings();
    fetchCart();
  }, []);

  const dispatch = useDispatch();

  async function fetchMenu() {
    const res = await fetchMenuItems();
    setMenu(res.data);
    dispatch(updateMenuData(res.data));
  }

  async function getToppings() {
    const res = await fetchToppings();
    dispatch(updateToppings(res.data));
  }

  const category = [
    {
      title: "BESTSELLERS",
      data: menu.pizza.filter((x) => x.is_bestseller === true),
      type: "dominos_pizza",
    },
    {
      title: "NEW LAUNCHES",
      data: menu.pizza.filter((x) => x.is_new === true),
      type: "dominos_pizza",
    },
    {
      title: "VEG PIZZA",
      data: menu.pizza.filter((x) => x.is_veg === true),
      type: "dominos_pizza",
    },
    {
      title: "NON-VEG PIZZA",
      data: menu.pizza.filter((x) => x.is_veg !== true),
      type: "dominos_pizza",
    },
    {
      title: "BEVERAGES",
      data: menu.beverages,
      type: "dominos_sides",
    },
    {
      title: "SPECIALITY CHICKEN",
      data: menu.chicken,
      type: "dominos_sides",
    },
    {
      title: "SIDES",
      data: menu.sides,
      type: "dominos_sides",
    },
    {
      title: "PIZZA MANIA",
      data: menu.mania,
      type: "dominos_mania",
    },
    {
      title: "MEALS & COMBOS",
      data: menu.combos,
      type: "dominos_sides",
    },
    {
      title: "DESSERT",
      data: menu.dessert,
      type: "dominos_sides",
    },
  ];

  const [openCustomization, setOpenCustomization] = useState(false);

  async function fetchCart() {
    const res = await fetchCartItems();
    if (res.success) {
      dispatch(updateCart(res.cart));
    }
  }

  return (
    <div className="food-menu">
      {category.map((cat, index) => (
        <div key={index} className="food-category" id={cat.title}>
          <Title title={cat.title} />
          <div className="food-category-body">
            {cat.data.map((item, index) =>
              cat.type === "dominos_pizza" ? (
                <PizzaCard
                  key={item.name + "-" + index}
                  item={item}
                  id={cat.title + "-" + item.name + "-" + index}
                  openCustomization={openCustomization}
                  setOpenCustomization={setOpenCustomization}
                />
              ) : cat.type === "dominos_sides" ? (
                <SidesCard
                  key={item.name + "-" + index}
                  item={item}
                  id={cat.title + "-" + item.name + "-" + index}
                />
              ) : (
                cat.type === "dominos_mania" && (
                  <ManiaCard
                    key={item.name + "-" + index}
                    item={item}
                    id={cat.title + "-" + item.name + "-" + index}
                  />
                )
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Title({ title }) {
  return (
    <div className="food-category-title">
      <div className="food-category-block">{title}</div>
      <div className="food-category-line"></div>
    </div>
  );
}
