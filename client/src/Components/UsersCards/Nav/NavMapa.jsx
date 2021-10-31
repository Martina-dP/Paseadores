import React from "react";
import style from "./NavMapa.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Nav = ({page, pageSize}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    var id = localStorage.getItem("userId");
    var walker = localStorage.getItem("userWalker");
    var admin = localStorage.getItem("userAdmin");

    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
            <div className={style.log}>
                {walker === "true" && <Link to={`/walker/perfil/${id}`} className={style.home}>
                    <span class="material-icons-outlined">school</span>
                    <span>Mi perfil</span>
                </Link>}
                {walker === "false" && admin === "false" &&
                    <Link to={`/Cliente/${id}`} className={style.home}>
                        <span class="material-icons-outlined">school</span>
                        <span>Mi perfil</span>
                    </Link>}
            <div >
                <Link to={`/cardsUsers`} className={style.textdeco}>
                    <div className={style.home2}>
                        <span class="material-icons-outlined">home</span>
                        <p>Home</p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Nav;
