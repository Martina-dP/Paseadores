import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker, useMapEvents, mouseEvent, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from "leaflet"
import icon from '../media/icon.png'
import style from "./MapView.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getPaseadorForId, putDetailsUser } from "../actions/index";
import Markers from "./Markers"
import LocationMarker from "./LocationMarker"
import AddMarkerToClick from "./AddMarkerToClick"




const SelectorMap = ({name, surname, latitude, longitude, client =false}) => {

    
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");
    
    const dispatch = useDispatch();
    

  return <div className={style.map}>

       {latitude  &&
   <MapContainer center={[latitude,longitude]} zoom={13} scrollWheelZoom={true} >

      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
 {!client ?
<CircleMarker center={[latitude, longitude]} color= 'blue'  fillColor= '#0000FF' fillOpacity= "0.5" radius= "50"  stroke={false} >
           <Popup>
        {name} {surname}
      </Popup>
      </CircleMarker>
      :
      <Markers allUsers= {[{name, surname, latitude, longitude}]}/>
      }
  </MapContainer>
 }
   
  </div>
  
};
export default SelectorMap;

