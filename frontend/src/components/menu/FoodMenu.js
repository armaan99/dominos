import React, { useState, useEffect } from "react";
import "./FoodMenu.css";
import { dominos_pizza } from "../../data/dominos_pizza";
import { dominos_sides } from "../../data/dominos_sides";
import { dominos_beverages } from "../../data/dominos_beverages";
import PizzaCard from "../cards/pizza_card/PizzaCard";
import SidesCard from "../cards/sides_card/SidesCard";
import ManiaCard from "../cards/mania_card/ManiaCard";
import { dominos_combos } from "../../data/dominos_combos";
import { dominos_dessert } from "../../data/dominos.dessert";
import { dominos_chicken } from "../../data/dominos_chicken";
import { dominos_mania } from "../../data/dominos_mania";
import { fetchMenuItems } from "../../api";

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
  }, []);

  async function fetchMenu() {
    const res = await fetchMenuItems();
    console.log(res);
    setMenu(res.data);
  }

  const category = [
    {
      title: "BESTSELLER",
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

  return (
    <div className="food-menu">
      {category.map((cat, index) => (
        <div key={index} className="food-category">
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
