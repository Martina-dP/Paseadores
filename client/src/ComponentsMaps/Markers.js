import React from "react";
import { Marker, Popup, CircleMarker} from 'react-leaflet';
import L from "leaflet"
import { Link } from "react-router-dom";
import icon from '../media/icon.png'


var icono = L.icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        iconSize: new L.Point(28, 35),
        className: 'Leaflet-venue-icon'
    });
const Markers = (props) => {
const {allUsers} = props

const markers = allUsers.map((el,i) => (
  
  <Marker key={i} position={[el.latitude,el.longitude]} icon={icono} >
       
  <Popup>
  <Link to={`/walker/perfil/contacto/${el.id}`} >
   <h3> {el.name} {el.surname}</h3>
  </Link>
  {el.service === "Walker" && "Paseador"}
  {el.service === "Carer" && "Cuidador"}
  {el.service === "Walker and Carer" && "Paseador y Cuidador"}
                      
  </Popup>
  </Marker>
  
  ))
 
   return markers;
  
  
};
export default Markers;
