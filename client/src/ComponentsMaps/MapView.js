import React, { useEffect } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from "leaflet"
import icon from '../media/icon.png'
import style from "./MapView.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getWalkersForMap } from "../actions/index";
import Markers from "./Markers"

const MapView = ({latitude, longitude, name, surname, fullscream = false}) => {

  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getWalkersForMap(token)
    );

  }, [dispatch]);

  const allUsers = useSelector((state) => state.allPaseadores)
  
  

  return <div className={style.map}>
   {latitude && !fullscream && <MapContainer center={{lat:latitude,lng:longitude}} zoom={13} scrollWheelZoom={true}>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     <CircleMarker center={{lat:latitude,lng:longitude}} color= 'blue'  fillColor= '#0000FF' fillOpacity= "0.5" radius= "50"  stroke={false} >
    <Popup>
      {name} {surname}
    </Popup>
    </CircleMarker>
  </MapContainer>}


  {allUsers.length && fullscream && <MapContainer className={style.map} center={{lat: "-34.606783",lng:"-58.435958"}} zoom={13} scrollWheelZoom={true}>
    <TileLayer
   attribution='Map data © OpenStreetMap contributors, CC-BY-SA, Jortilles'
    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />


  <Markers allUsers= {allUsers} />
  
</MapContainer>}
   
  </div>
  
};
export default MapView;
