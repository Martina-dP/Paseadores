import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { putDetailsUser } from "../../../actions";
import style from "./Edit.module.css";
import Swal from "sweetalert2";

const Edit = () => {
  const user = useSelector((state) => state.user); //TODO

  const history = useHistory();
  const dispatch = useDispatch();
  const paseador = useSelector((state) => state.detailWalker);
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
  }, []);

  const [input, setInput] = useState({
    status: paseador.status,
    service: paseador.service,
    phone: paseador.phone,
    email: paseador.email,
    ubication: paseador.ubication,
    dni: paseador.dni,
    image: paseador.image,
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
    history.push(`/walker/perfil/${id}`);
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
    dispatch(putDetailsUser(input, id, token));
    Swal.fire({
      icon: "success",
      title: "Cambios Efectuados",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(history.push(`/walker/perfil/${id}`), 3000);
  };

  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handlerSubmit}>
        <h1>Información</h1>
        <select
          value={input.status}
          defaultValue={paseador.status}
          name="status"
          onChange={inputChange}
          className={style.selector}
        >
          <option>Seleccione Estado:</option>
          <option value="active">Disponible</option>
          <option value="inactive">No disponible</option>
        </select>
        <select
          value={input.service}
          defaultValue={paseador.service}
          name="service"
          onChange={inputChange}
          className={style.selector}
        >
          <option>Seleccione Servicio:</option>
          <option value="Paseador">Paseador</option>
          <option value="Cuidador">Cuidador</option>
          <option value="Paseador y Cuidador">Paseador y Cuidador</option>
        </select>
        <input
          type="text"
          name="phone"
          // defaultValue={paseador.phone}
          value={input.value}
          placeholder={`Número de teléfono: ${paseador.phone}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="email"
          // defaultValue={paseador.email}
          value={input.value}
          placeholder={`Email: ${paseador.email}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="ubication"
          // defaultValue={paseador.ubication}
          value={input.value}
          placeholder={paseador.ubication ? paseador.ubication : "Ubicación"}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="dni"
          // defaultValue={paseador.dni}
          value={input.value}
          placeholder={`Número de documento: ${paseador.dni}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <div className={style.selectFile}>
          <label className={style.label}>
            Seleccionar una imagen de perfil
          </label>
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

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
// import { putDetailsUser } from "../../../actions";
// import style from "./Edit.module.css";
// import { useParams } from "react-router";
// import Swal from "sweetalert2";

// const Edit = () => {
//   const user = useSelector((state) => state.user); //TODO

//   const history = useHistory();

//   const dispatch = useDispatch();

//   const paseador = useSelector((state) => state.detailWalker);
//   var id = localStorage.getItem("userId");
//   var token = localStorage.getItem("userToken");

//   const [input, setInput] = useState({
//     status: paseador.status,
//     service: paseador.service,
//     birth_day: paseador.birth_day,
//     phone: paseador.phone,
//     email: paseador.email,
//     ubication: paseador.ubication,
//     dni: paseador.dni,
//     image: paseador.image,
//   });

//   const inputChange = (e) => {
//     e.preventDefault();
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogout = (event) => {
//     event.preventDefault();
//     history.push(`/walker/perfil/${id}`);
//   };

//   const uploadImage = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append("file", files[0]);
//     data.append("upload_preset", "projectimages");
//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/dvmrhxfht/image/upload",
//       {
//         method: "POST",
//         body: data,
//       }
//     );
//     const file = await res.json();
//     setInput((values) => ({
//       ...values,
//       image: file.secure_url,
//     }));
//   };

//   const handlerSubmit =  () => {
//     console.log(user);
//      dispatch(putDetailsUser(input, user, token));
//      Swal.fire({
//       icon: 'success',
//       title: 'Cambios Efectuados',
//       showConfirmButton: false,
//       timer: 1000
//     })
//     setTimeout(history.push(`/walker/perfil/${id}`), 3000);
//   };

//   return (
//     <div className={style.container}>
//       {console.log(user.id, id)}
//       <form className={style.formulario} onSubmit={handlerSubmit}>
//         <h1>Informacion</h1>
//         <select
//         className={style.selector}
//           value={input.service}
//           defaultValue={paseador.service}
//           name="service"
//           onChange={inputChange}
//         >
//           <option>Seleccione Servicio:</option>
//           <option value="Walker">Paseador</option>
//           <option value="Carer">Cuidador</option>
//           <option value="Walker and Carer">Paseador y Cuidador</option>
//         </select>
//         <input
//           type="date"
//           name="birth_day"
//           // defaultValue={paseador.birth_day}
//           value={input.value}
//           placeholder={paseador.birth_day}
//           onChange={(e) => inputChange(e)}
//         />
//         <input
//           type="text"
//           name="phone"
//           // defaultValue={paseador.phone}
//           value={input.value}
//           placeholder={paseador.phone}
//           onChange={(e) => inputChange(e)}
//         />
//         <input
//           type="text"
//           name="email"
//           // defaultValue={paseador.email}
//           value={input.value}
//           placeholder={paseador.email}
//           onChange={(e) => inputChange(e)}
//         />
//         <input
//           type="text"
//           name="ubication"
//           // defaultValue={paseador.ubication}
//           value={input.value}
//           placeholder={paseador.ubication ? paseador.ubication : "Ubicación"}
//           onChange={(e) => inputChange(e)}
//         />
//         <input
//           type="text"
//           name="dni"
//           // defaultValue={paseador.dni}
//           value={input.value}
//           placeholder={paseador.dni}
//           onChange={(e) => inputChange(e)}
//         />
//         <div className={style.selectFile}>
//           <div className={style.selectFile}>
//             <label>Selecciona una imagen de perfil</label>
//             <input
//               type="file"
//               name="image"
//               className={style.file}
//               onChange={uploadImage}
//             />
//           </div>
//         </div>
//         <button type="submit">Editar</button>
//       </form>
//       <br />
//       <br />
//       <button className={style.volver} onClick={handleLogout}>
//         {" "}
//         Volver{" "}
//       </button>
//     </div>
//   );
// };
// export default Edit;
