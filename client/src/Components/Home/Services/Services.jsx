import React from 'react'
import style from './Services.module.css'
import foto1 from '../../../media/foto1Service.jpg'
import foto2 from '../../../media/foto2Service.jpg'

const Services = () => {
    return (
        <div className={style.container} id='services'>
            <div className={style.title}>
                <h1>Servicios</h1>
            </div>
            <div className={style.servicios}>
                <div className={style.servConteiner}>
                    <div className={style.serv}>
                        <img className={style.imagen} src={foto1} alt=''/>
                        <h3>Paseo</h3>
                        <p>Registrate como paseador, coloca tus datos, y espera a que te conctacten.</p>
                        
                        
                    </div>
                </div>
                <div className={style.servConteiner}>
                   <div className={style.serv} >
                        <img  className={style.imagen} src={foto2} alt=''/>
                        <h3>Cuidado</h3>
                        <p>Registrate como cuidador, coloca tus datos, y espera a que te conctacten.</p>
                        
                      
                   </div>
                </div>

            </div>
        </div>
    )
}

export default Services
