import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import god from "../../media/DontLike.png";
import favorito from "../../media/favorito.png";
import media from "../../media/media.png";
import estrella from "../../media/estrella.png";
import { useDispatch, useSelector } from "react-redux";
import fotoDefault from "../../media/fotoAnonima.jpg";
import {
  postUserFavorite,
  getUserFavorites,
  deleteUserFavorite,
} from "../../actions/index";

import foto from "../../media/fotosola.png";

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
import mediapatita from "../../media/mediapatita.png";
function Card({
  id,
  name,
  surname,
  image,
  ubication,
  service,
  price,
  description,
  fv = false,
}) {
  const dispatch = useDispatch();
  const idClient = localStorage.getItem("userId");
  const [fav, setFav] = useState(true);

  const walker = localStorage.getItem("userWalker");
  const admin = localStorage.getItem("userAdmin");
  const token = localStorage.getItem("userToken");

  const score = useSelector((state) => state.score);

  async function addFavorite() {
    if (fv === false) {
      await dispatch(
        postUserFavorite({ idClient: idClient, idUser: id }, token)
      );
      dispatch(getUserFavorites(idClient, token));
    } else {
      await dispatch(
        deleteUserFavorite({ idClient: idClient, idUser: id }, token)
      );
      dispatch(getUserFavorites(idClient, token));
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {image ? (
          <img className={styles.image} src={image} alt="foto paseador" />
        ) : (
          <img className={styles.image} src={fotoDefault} alt="a" />
        )}
        <div className={styles.scoreContain}>
          <h1>{score?.toFixed(1)}</h1>
          <div className={styles.estrellas}>
            <img src={estrella} alt="" />
            {score < 1 && <img src={favorito} alt="sas" />}
            {score > 1 && score < 2 && <img src={media} alt="" />}
            {score >= 2 && <img src={estrella} alt="" />}
            {score < 2 && <img src={favorito} alt="sas" />}
            {score > 2 && score < 3 && <img src={media} alt="" />}
            {score >= 3 && <img src={estrella} alt="" />}
            {score < 3 && <img src={favorito} alt="sas" />}
            {score > 3 && score < 4 && <img src={media} alt="" />}
            {score >= 4 && <img src={estrella} alt="" />}
            {score < 4 && <img src={favorito} alt="sas" />}
            {score > 4 && score < 5 && <img src={media} alt="" />}
            {score === 5 && <img src={estrella} alt="" />}
            {score < 5 && <img src={favorito} alt="sas" />}
          </div>
        </div>
      </div>
      <div className={styles.conteinerDerecha}>
        <div className={styles.title}>
          <h1 className={styles.name}>{name + " " + surname}</h1>
          <hr></hr>
          <h2>{service}</h2>
          {/* <h3>Descripcion:</h3>
        {description ? (
          <span>{description}</span>
          ) : (
            <span>
            Informacion no disponible .
            </span>
          )} */}
          <h3>Precio:</h3>
          <p> ${price}</p>
          <h3>Ubicación:</h3>
          {ubication ? (
            <span>{ubication}</span>
          ) : (
            <p>Ubicacion no disponible.</p>
          )}

          {walker === "false" && (
            <div className={styles.boton}>
              <Link to={`/walker/perfil/contacto/${id}`}>
                <button>Saber mas...</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.containerDerecha}>
        <div className={styles.containerEstrella}>
          {walker === "false" && admin === "false" && (
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
        </div>
        <div className={styles.containerImagen}>
          <img className={styles.fotoFondo} src={foto} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Card;
