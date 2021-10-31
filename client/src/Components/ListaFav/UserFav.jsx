import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserFav.module.css";
import god from "../../media/DontLike.png";
import favorito from "../../media/favorito.png";
import estrella from "../../media/estrella.png";
import { useDispatch, useSelector } from "react-redux";
import fotoDefault from "../../media/fotoAnonima.jpg";
import {
  postUserFavorite,
  getUserFavorites,
  deleteUserFavorite,
  getForListFav,
} from "../../actions/index";

// function Card({
//   id,
//   name,
//   surname,
//   image,
//   reputation,
//   service,
//   price,
//   description,
// }) {
//   const [fav, setFav] = useState(true);
//   const handlerFavorite = () => {
//     console.log("estaentrando", fav);

function UserFav({
  id,
  name,
  surname,
  image,
  reputation,
  service,
  price,
  description,
  fv = false,
}) {
  const dispatch = useDispatch();
  const idClient = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  const [fav, setFav] = useState(true);

  const walker = localStorage.getItem("userWalker");

  async function addFavorite() {
    if (fv === false) {
      await dispatch(
        postUserFavorite({ idClient: idClient, idUser: id }, token)
      );
      await dispatch(getUserFavorites(idClient, token));
      dispatch(getForListFav(idClient, token));
    } else {
      await dispatch(
        deleteUserFavorite({ idClient: idClient, idUser: id }, token)
      );
      await dispatch(getUserFavorites(idClient, token));
      dispatch(getForListFav(idClient, token));
    }
  }

  return (
    <div className={styles.card} draggable>
      <div className={styles.title}>
        <h1 className={styles.name}>{name + " " + surname}</h1>
        {/* <hr></hr> */}
        {walker === "false" && (
          <button
            className={styles.prueba}
            onClick={(e) => {
              addFavorite(e);
            }}
          >
            {fv ? (
              <img src={estrella} alt="" />
            ) : (
              <img src={favorito} alt="sas" />
            )}
          </button>
        )}
        {image ? (
          <img className={styles.image} src={image} alt="foto paseador" />
        ) : (
          <img className={styles.image} src={fotoDefault} alt="a" />
        )}
        <h3>{service}</h3>
        <div>{price}</div>
        {walker === "false" && (
          <div className={styles.boton}>
            <Link to={`/walker/perfil/contacto/${id}`}>
              <button>Saber mas...</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserFav;
