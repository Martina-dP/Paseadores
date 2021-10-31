import React from 'react'
import style from './SelectType.module.css'
import { Link } from 'react-router-dom'

const SelectType = () => {
    return (
        <div className={style.container}>
            <div className={style.formulario}>
                <div className={style.title}>
                    <h1>Registrarse como:</h1>
                </div>
                <hr></hr>
                <div className={style.botones}>
                    <Link to='/FormWalker'>
                        <button className={style.boton}>Paseador / Cuidador</button>
                    </Link>
                    
                        <button  className={style.boton} >Dueno de mascota</button>
                    
                </div>
                <div className={style.count}>
                    <p>Do you already have an account?  </p>
                    <a href='#'>  Sign In</a>
                </div>

            </div>
            
        </div>
    )
}

export default SelectType