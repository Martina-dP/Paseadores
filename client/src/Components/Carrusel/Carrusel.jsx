import React from "react";
import CardCarrusel from "../CardCarrusel/CardCarrusel";
import { getPaseadorPremuim } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Carrusel.module.css";
// const shuffle = require("lodash/shuffle");
import { shuffle } from "lodash";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Paginado from './Paginado';

function Carrusel() {
  const usersPremium = useSelector((state) => state.premium);
  const token = localStorage.getItem("userToken");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaseadorPremuim(token));
  }, [dispatch, token]);

  // const index = Math.floor(Math.random() * usersPremium.length);

  // function Aleatorios(usersPremium) {
  //   return [...usersPremium]
  //   .sort(() => (Math.random() > 0.5 ? 1 : -1))

  // random = function (usersPremium) {
  //   return usersPremium[Math.floor((Math.random()*usersPremium.length))];
  // }

  return (
    <div className={style.carrusel}>
      <h3 className={style.titulo}>Usuarios Premium</h3>
      <div className={style.cartas}>
        {shuffle(usersPremium).map((pr) => {
          return (
            <CardCarrusel
              key={pr.id}
              id={pr.id}
              name={pr.name}
              surname={pr.surname}
              image={pr.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Carrusel;