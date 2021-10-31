import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./PerfilCliente.module.css";
import { Link, useHistory } from "react-router-dom";
import { getClienteForId } from "../../actions/index";
import Nav from "./nav/Nav";
import ListaFav from "./Favoritos/ListaFav";
import LocationMarker from "../../ComponentsMaps/LocationMarker";
import AddMarkerToClick from "../../ComponentsMaps/AddMarkerToClick";
import SelectorMap from "../../ComponentsMaps/SelectorMap";
import cara from '../../media/carita.png'

const PerfilCliente = () => {
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");
 

const [mapa, setMapa] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();

  function handleOnClick1(e) {
    e.preventDefault();
    setMapa("auto");
  }
  function handleOnClick2(e) {
    e.preventDefault();
    setMapa("manual");
  }

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
            </ul>
            <Link
              to={`/Cliente/editInformation/${id}`}
              className={style.editContainerInfo}
            >
              <button className={style.editDescription}>
                Editar Informacion
              </button>
            </Link>
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
            <Link
              to={`/Cliente/editDescription/${id}`}
              className={style.editContainer}
            >
              <button className={style.editNew}>
               <span class="material-icons-outlined">edit</span>
              </button>
            </Link>
          </div>
          <div className={style.local}>
            <h2 className={style.ubicacion}>Ubicacion:</h2>
            <button
              className={style.botones}
              onClick={(e) => {
                handleOnClick1(e);
              }}
            >
              Detectar 
            </button>

            <button
              className={style.botones}
              onClick={(e) => {
                handleOnClick2(e);
              }}
            >
              Agregar  manualmente
            </button>
          
              <div className={style.mapaNuevo} >
                  {Client.latitude && mapa === "" && (
                    <SelectorMap
                    
                      name={Client.name}
                      surname={Client.surname}
                      latitude={Client.latitude}
                      longitude={Client.longitude}
                      client={true}
                    />
                  )}
                  {mapa === "auto" && (
                    <LocationMarker
                      name={Client.name}
                      surname={Client.surname}
                      latitude={Client.latitude}
                      longitude={Client.longitude} 
                      client={true}
                    />
                  )}
                  {mapa === "manual" && (
                    <AddMarkerToClick
                      name={Client.name}
                      surname={Client.surname}
                      latitude={Client.latitude}
                      longitude={Client.longitude}
                      client={true}
                    />
                  )}
              </div>
          </div>
          <div className={style.favoritos}>
            <h2 className={style.favTitulo}>Favoritos</h2>
            <div className={style.listfav}>
              <ListaFav />
            </div>
          </div>
        </div>
      </div>
        <img  className={style.cara} src={cara} alt="cara" />
    </div>
  );
};
export default PerfilCliente;
