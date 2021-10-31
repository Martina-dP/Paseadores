import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import style from "./nav.module.css";
import { getPaseadorForId, getClienteForId } from "../../../actions/index";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {

  var id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");
  const walker = localStorage.getItem("userWalker");
  var admin = localStorage.getItem("userAdmin");
  console.log(admin)

  const dispatch = useDispatch();
  const Walker = useSelector((state) => state.detailWalker);
  const Client = useSelector((state) => state.detailCliente);

  console.log(Walker)

  useEffect(() => {
    if (id) {
      if( walker === "true"){
      dispatch(getPaseadorForId(id, token));
      }
      if(walker === "false" &&  admin === "false"){
        dispatch(getClienteForId(id, token));
      }
    }
  }, []);


  return (
    <nav className={style.navBar}>
      <div className={style.container}>
        <div className={style.title}>
          <h3 className={style.logo}>Happy Dog!</h3>
        </div>
        <div className={style.containerA}>
          <a href="#home">Home</a>
          <a href="#about">Sobre Nosotros</a>
          <a href="#services">Servicios</a>
          <a href="#premium">Premium</a>
          <a href="#contact">Contacto</a>
        </div>
        { id && walker === "true" && <Link to={"/walker/perfil/"+id}  className={style.login}>
        <div className={style.containerLogin}>
            <span className={style.icon} class="material-icons-outlined">
              account_circle
            </span>
            <span className={style.log}>{Walker.name} {Walker.surname}</span>
          </div>
          </Link>}
        { id && walker === "false" &&  admin === "false" && <Link to={"/Cliente/"+id} className={style.login}>
        <div className={style.containerLogin}>
            <span className={style.icon} class="material-icons-outlined">
              account_circle
            </span>
            <span className={style.log}>{Client.name} {Client.surname}</span>
          </div>
          </Link>}
        { id && admin === "true" && <Link to={"/admin"} className={style.login}>
        <div className={style.containerLogin}>
            <span className={style.icon} class="material-icons-outlined">
              account_circle
            </span>
            <span className={style.log}>Admin</span>
          </div>
          </Link>}
          
        {!id && <Link to="/login" className={style.login}>
          <div className={style.containerLogin}>
            <span className={style.icon} class="material-icons-outlined">
              account_circle
            </span>
            <span className={style.log}>Iniciar Sesión</span>
          </div>
        </Link>}
      </div>
    </nav>
  );
};
export default Nav;