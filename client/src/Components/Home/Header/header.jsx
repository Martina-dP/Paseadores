import React from 'react'
import { useSelector } from "react-redux";
import style from './header.module.css'
import foto from '../../../media/proceso2.jpg'
import {Link} from 'react-router-dom'


const Header = () => {


    const walker = localStorage.getItem("userWalker");
    var admin = localStorage.getItem("userAdmin");
    const token = localStorage.getItem("userToken");
  const Walker = useSelector((state) => state.detailWalker);
  const Client = useSelector((state) => state.detailCliente);

    return (
        <div className={style.container1} id='home'>
            <div className={style.form}>
                <h1>Happy</h1>
                <h1>Dog!</h1>
                {token && walker === "true" && <span>Bienvenido {Walker.name}</span>}  
                {token && walker === "false" &&  admin === "false" && <span>Bienvenido {Client.name}</span>}  
                {token && admin === "true" && <span>Bienvenido Admin</span>}   
                {!token && <span>Regístrate y conócenos</span>}   
                {token ?
                 <Link to='/cardsUsers'>
                 <div>
                 <button className={style.botonP}>INGRESAR</button> 
                 </div>
             </Link> 
                 :
                <Link to='/pre-login'>
                    <div>
                    <button className={style.botonP}>REGISTRARSE</button> 
                    </div>
                </Link> }
            </div>
            <div className={style.fotoForm}>
                <img src={foto} alt='foto' />
            </div>
        </div>
    )
}

export default Header
