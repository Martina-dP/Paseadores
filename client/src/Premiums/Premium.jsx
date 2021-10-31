import React from 'react'
import style from './Premium.module.css'
import { Link } from 'react-router-dom'
import premium1 from '../media/premium1.jpg'
import premium2 from '../media/premium2.jpg'
import premium3 from '../media/premium3.jpg'
import premium4 from '../media/premium4.jpg'

const Premium = () => {
    return (
        <div className={style.slider}>
            <ul className={style.ContUl}>
                <li className={style.list}>
                    <div className={style.liContainer}>
                    <Link to="/premium">
                        <button>Hacerme premium</button>
                    </Link>
                        <img className={style.foto} src={premium1} alt='s'/>
                    </div>
                </li>
                <li className={style.list}>
                    <div className={style.liContainer}>
                    <Link to="/premium">
                        <button>Hacerme premium</button>
                    </Link>
                        <img  className={style.foto} src={premium2} alt='s'/>
                    </div>
                </li>
                <li className={style.list}>
                    <div className={style.liContainer}>
                    <Link to="/premium">
                        <button>Hacerme premium</button>
                    </Link>
                        <img className={style.foto} src={premium3} alt='s'/>
                    </div>
                </li>
                <li className={style.list}>
                    <div className={style.liContainer}>
                    <Link to="/premium">
                        <button>Hacerme premium</button>
                    </Link>
                        <img  className={style.foto} src={premium4} alt='s'/>
                    </div>
                </li>
            </ul>
            
        </div>
    )
}

export default Premium
