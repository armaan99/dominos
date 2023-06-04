import React from "react";
import "./Navigations.css";
import { Link } from "react-router-dom";

export default function Navigations() {
  window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY + 100;

    var sections = document.querySelectorAll(".food-category");
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute("id");
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.getElementById(sectionId + "1").classList.add("active");
      } else {
        document.getElementById(sectionId + "1").classList.remove("active");
      }
    });
  });

  return (
    <div className="navigations">
      <div className="navigators">
        <a id="BESTSELLERS1" href="#BESTSELLERS">
          BESTSELLERS
        </a>
        <a id="NEW LAUNCHES1" href="#NEW%20LAUNCHES">
          NEW LAUNCHES
        </a>
        <a id="VEG PIZZA1" href="#VEG%20PIZZA">
          VEG PIZZA
        </a>
        <a id="NON-VEG PIZZA1" href="#NON-VEG%20PIZZA">
          NON-VEG PIZZA
        </a>
        <a id="BEVERAGES1" href="#BEVERAGES">
          BEVERAGES
        </a>
        <a id="SPECIALITY CHICKEN1" href="#SPECIALITY%20CHICKEN">
          SPECIALITY CHICKEN
        </a>
        <a id="SIDES1" href="#SIDES">
          SIDES
        </a>
        <a id="PIZZA MANIA1" href="#PIZZA%20MANIA">
          PIZZA MANIA
        </a>
        <a id="MEALS & COMBOS1" href="#MEALS%20&%20COMBOS">
          MEALS & COMBOS
        </a>
        <a id="DESSERT1" href="#DESSERT">
          DESSERT
        </a>
      </div>
    </div>
  );
}
