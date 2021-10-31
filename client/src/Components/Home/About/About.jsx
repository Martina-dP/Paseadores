import React from 'react'
import style from './About.module.css'
import foto from '../../../media/fotoAbout.jpg'

const About = () => {
    return (
        <div className={style.container} id='about'>
            <div className={style.foto}>
                <img  className={style.imagen} src={foto} alt='notFound'/>
            </div>
            <div className={style.info}>
                <h1>Sobre Nosotros</h1>
                <p>Crea gratis tu perfil, elige los servicios que brindas y comienza a recibir contrataciones. Puedes brindar servicios caninos de cuidado o paseos.</p>
                <p>Crea tu cuenta y completa tu perfil con tus datos, fotos, precio, disponibilidad de días y horarios, zona, etc.</p>
                <p>Los clientes podrán hacerte consultas y, si se deciden por tí, te enviarán una solicitud de contratación. Podrás elegir aceptar o no cada pedido de contratación que recibas.</p>
                <p>Una vez aceptado el pedido de contratación recibirás los datos del cliente para encontrarse. Tus clientes podrán calificarte a través de nuestra web, así que brindales lo mejor de tí!</p>
            </div>
        </div>
    )
}

export default About
