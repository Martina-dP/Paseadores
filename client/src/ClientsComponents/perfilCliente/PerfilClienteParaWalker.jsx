import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./PerfilCliente.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { getClienteForId } from "../../actions/index";
import Nav from "./nav/Nav";
import ListaFav from "./Favoritos/ListaFav";
import SelectorMap from "../../ComponentsMaps/SelectorMap";

const PerfilCliente = () => {
  const idWalker = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  const { id } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const Client = useSelector((state) => state.detailCliente);

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
    dispatch(getClienteForId(id, token));
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Nav />
      <div className={style.containerPerfil}>
        <div className={style.personalInformation}>
          <div className={style.borderFoto}>
            <div className={style.fotoPerfil}>
              {Client.image ? (
                <img src={Client.image} alt="" />
              ) : (
                <img
                  src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className={style.informacion}>
            <h2>
              {Client.name} {Client.surname}
            </h2>
            <ul>
              <li className={style.liPhone}>{Client.phone}</li>
              <li className={style.liEmail}>{Client.email}</li>
              <li className={style.liUbication}>{Client.ubication}</li>
            </ul>
          </div>
        </div>

        <div className={style.caracteristicas}>
          <div className={style.descripcion}>
            <h2>Descripción</h2>
            <div className={style.textDescription}>
              {Client.description ? (
                <p className={style.textDescriptionNew}>{Client.description}</p>
              ) : (
                <p>Agrega una descripcion</p>
              )}
            </div>
            <SelectorMap
              name={Client.name}
              surname={Client.surname}
              latitude={Client.latitude}
              longitude={Client.longitude}
              client={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PerfilCliente;
