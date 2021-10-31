import React, { useState, useEffect } from "react";
import NavMapa from "./Nav/NavMapa";
import style from "./Nav/Nav.module.css";
import MapView from "../../ComponentsMaps/MapView"



const MapWalkers = () => {
    
   

   
    return (
        <div className={style.container}>
          <NavMapa/>

                <MapView
                  fullscream= {true}
                />
            
        </div>
    )
}

export default MapWalkers;
