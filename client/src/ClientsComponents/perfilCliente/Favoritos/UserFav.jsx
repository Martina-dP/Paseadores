import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserFav.module.css";
import favorito from "../../../media/favorito.png";
import estrella from "../../../media/estrella.png";
import { useDispatch } from "react-redux";
import fotoDefault from "../../../media/fotoAnonima.jpg";
import {
  postUserFavorite,
  getUserFavorites,
  deleteUserFavorite,
  getForListFav } from "../../../actions/index";

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
      <div className={styles.card}>
        <div className={styles.izquierda}>
          <Link to={`/walker/perfil/contacto/${id}`}>
            {image ? (
              <img className={styles.image} src={image} alt="foto paseador" />
            ) : (
              <img className={styles.image} src={fotoDefault} alt="a" />
            )}
          </Link>
        </div>
        <div className={styles.derecha}>
          <h1 className={styles.name}>{name + " " + surname}</h1>
          <h3 className={styles.servicio}>{service}</h3>
          {walker === "false" && (
          <button
            className={styles.prueba}
            onClick={(e) => {
              addFavorite(e);}}
          >
            {fv ? (
              <img src={estrella} alt="" />
            ) : (
              <img src={favorito} alt="sas" />
            )}
          </button>
        )}
        </div>
      </div>
  );
}

export default UserFav;