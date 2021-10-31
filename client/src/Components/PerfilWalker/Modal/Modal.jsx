import React from 'react'
import estilo from './Modal.module.css'

const Modal = ({children, isOpen, closeModal}) => {
    const handleClickModal =(e)=> e.stopPropagation();
    return (
        <article  className= {`${estilo.modal} ${isOpen && estilo.modalOpen}`} onClick={closeModal}>
            <div className={estilo.container} onClick={handleClickModal}>
                <button className={estilo.modalClose} onClick={closeModal}>Volver a tu perfil</button>
                {children}
            </div>
            
        </article>
    )
}

export default Modal
