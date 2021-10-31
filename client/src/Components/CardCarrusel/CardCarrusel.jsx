import React from "react";
import { Link } from "react-router-dom"
import styles from "./CardCarrusel.module.css"


function CardCarrusel({ id, name, surname, image }) {

  return (
    <div className={styles.conteiner} >
      <Link to={`/walker/perfil/contacto/${id}`} >
        {image ? <img className={styles.img} value="info" src={image} alt="img not found" /> : <img className={styles.img} src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" alt='' />}
      </Link>
      <h2 className={styles.nombre}> {name} {surname} </h2>
    </div>
  )
}





export default CardCarrusel;