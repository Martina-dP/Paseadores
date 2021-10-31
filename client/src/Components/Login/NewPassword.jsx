import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import style from "./Login.module.css";
import { useSelector } from "react-redux";
import { newPassword } from "../../actions";
import { useParams } from 'react-router'

const NewPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [values, setValues] = useState({
    password1: "",
    password2: "",
  });

  const mensaje = useSelector((state) => state.mensaje);

  const handleOnChange = ({ target: { name, value } }) =>
    setValues({
      ...values,
      [name]: value,
    });


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(values.password1 === values.password2){
    dispatch(newPassword(token, {password : values.password1}));
    setValues({
      ...values,
      password1: "",
      password2: "",
    });
    alert("Contraseña cambiada")
    history.push(`/login`);
    }else{alert("Contraseñas diferentes")}
  };

  return (
    <div className={style.container}>
      <div className={style.log}>
        <h1>Cambiar contraseña</h1>
        <form className={style.form} onSubmit={handleOnSubmit}>
          <div className={style.field}>
            <input
              name="password1"
              onChange={handleOnChange}
              type="password"
              value={values.name}
              required
            />
            <span></span>
            <label htmlFor="">Nueva Contraseña</label>
          </div>
          <div className={style.field}>
            <input
              name="password2"
              onChange={handleOnChange}
              type="password"
              value={values.name}
              required
            />
            <span></span>
            <label htmlFor="">Repetir Contraseña</label>
          </div>
           <input className={style.login} type="submit" value="confirmar"></input>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
