import React from 'react'
import style from './Footer.module.css'
import fb from '../../../media/facebook.png'
import tw from '../../../media/twitter.png'
import ig from '../../../media/instagram.png'
import gg from '../../../media/github.png'


const Footer = () => {
    return (
        <div className={style.container}>
            <div className={style.containerDos}>
                <div className={style.name}>
                        <h2>Happy Dog !</h2>
                        <p>Aplicación diseñada y desarrollada por los estudiantes de Henry de la Cohorte FT-16 en el proyecto final.</p>
                    </div>
                    <div className={style.social}>
                        <h3>Social</h3>
                        <div className={style.imagen}>
                            <img src ={fb} alt='fb'/>
                            <img src ={ig} alt='ig'/>
                            <img src ={tw} alt='tw'/>
                            <img src ={gg} alt='gg'/>
                        </div>
                    </div>
                    <div className={style.legal}>
                        <h3>Legal</h3>
                        <button>Politicas de Privacidad</button>
                        <button>Terminos de Uso</button>
                        <button>Contrato</button>
                    </div>
            </div>
             
                <p className={style.foot}>Todos los derechos reservados por © Happy Dog !</p>
        </div>
    )
}

export default Footer
