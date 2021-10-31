import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { putDetailsCliente } from "../../actions";
import style from "./informacion.module.css";
import Swal from "sweetalert2";

const Edit = () => {
  const user = useSelector((state) => state.user);
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  const history = useHistory();

  const dispatch = useDispatch();

  const cliente = useSelector((state) => state.detailCliente);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
  }, []);

  const [input, setInput] = useState({
    phone: cliente.phone,
    email: cliente.email,
    ubication: cliente.ubication,
    image: cliente.image,
  });

  const inputChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    history.push(`/Cliente/${user.id}`);
  };

  const uploadImage = async (e) => {
    setLoading(false);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "projectimages");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvmrhxfht/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setInput((values) => ({
      ...values,
      image: file.secure_url,
    }));
    setLoading(true);
  };

  const handlerSubmit = () => {
    console.log(user);
    dispatch(putDetailsCliente(input, id, token));
    Swal.fire({
      icon: "success",
      title: "Cambios Efectuados",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(history.push(`/Cliente/${id}`), 3000);
  };

  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handlerSubmit}>
        <h1>Información</h1>
        <input
          type="text"
          name="phone"
          value={input.value}
          placeholder={`Número de teléfono: ${cliente.phone}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="email"
          value={input.value}
          placeholder={`Email: ${cliente.email}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="ubication"
          value={input.value}
          placeholder={cliente.ubication ? cliente.ubication : "Ubicación"}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <div className={style.selectFile}>
          <label className={style.label}>Selecciona una imagen de perfil</label>
          <div>
            <input
              type="file"
              name="image"
              onChange={uploadImage}
              className={style.inputImg}
            />
          </div>
        </div>
        <div className={style.containerBtn}>
          <button className={style.volver} onClick={handleLogout}>
            Atrás
          </button>
          {loading ? (
            <button className={style.edit} type="submit">
              Guardar cambios
            </button>
          ) : (
            <span>Cargando imagen</span>
          )}
        </div>
      </form>
    </div>
  );
};
export default Edit;
