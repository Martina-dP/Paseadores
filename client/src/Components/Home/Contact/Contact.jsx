import React from 'react'
import style from './Contact.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {contacto} from "../../../actions/index"

const Contact = () => {
    
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name : "",
        mail : "",
        message : "",
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(contacto(input))
        }
      
    

    return (
        <div className={style.container} id='contact'>
            <div className={style.contact}>
                <h1>Contacto</h1>
            </div>
            <div className={style.listContact}>
                <div className={style.list}>
                    <h4>Teléfono</h4>
                    <p>+54 353 - 4196213</p>
                </div>
                <div className={style.list}>
                    <h4>Email</h4>
                    <p>Happydog@gmail.com</p>
                </div>
                <div className={style.list}>
                    <h4>Horario</h4>
                    <p>Lunes - Viernes : 8:00 am - 8:00 pm</p>
                    <p>Sábado : 8:00 am - 12:00 pm</p>
                </div>
                <div className={style.list}>
                    <h4>Area de Servicio</h4>
                    <p>Argentina</p>
                    <p>Cordoba</p>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={style.form1}>
                    <div className={style.formName}>
                        <input
                            type='text'
                            placeholder='Nombre' 
                            value={input.name}
                             name="name"
                            onChange={(e) => handleChange(e)}
                        />
                            
                    </div>
                    <div className={style.formEmail}>
                        <input
                            type='text'
                            placeholder='Email'
                            value={input.mail}
                             name="mail"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className={style.form2}>
                    <textarea type='text' placeholder='Escribe tu mensaje aquí...'
                    value={input.message}
                    name="message"
                   onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={style.divBtn}>
                    <div className={style.botonContainer}>
                    <button className = {style.boton} type = "submit">Enviar </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contact
