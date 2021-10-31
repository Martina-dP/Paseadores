import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { recoverPassword } from "../../actions";

const RecoverPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [values, setValues] = useState({
    email: "",
  });

  const mensaje = useSelector((state) => state.mensaje);
  
  const handleOnChange = ({ target: { name, value } }) =>
    setValues({
      ...values,
      [name]: value,
    });


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(recoverPassword(values));
    setValues({
      ...values,
      email: "",
    });
    alert("Enviamos un mensaje a tu email")
    history.push(`/login`);
  };

  return (
    <div className={style.container}>
      <div className={style.log}>
        <h1>Ingresar email</h1>
        <form className={style.form} onSubmit={handleOnSubmit}>
          <div className={style.field}>
            <input
              name="email"
              onChange={handleOnChange}
              type="text"
              value={values.name}
              required
            />
            <span></span>
          </div>
          <input className={style.login} type="submit" value="enviar"></input>
          <div className={style.inicio}>
            <Link className={style.create} to="/login">
              <p className={style.create}> Volver a iniciar sesion</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
