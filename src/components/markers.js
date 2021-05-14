import React from "react";
import { Marker } from "react-google-maps";

const click = function onMarkerClick(data) {
  alert(data);
};
export default function Makers(props) {
  let items = [];
  
  for (let i = 0; i < props.items.length; i++) {
    
    items.push(
      <Marker
        position={{lat:parseInt(props.items[i].lat), lng: parseInt(props.items[i].lng)}}
        onClick={() => {
          click(props.items[i].name);
        }}
      ></Marker>
      
    )
  } 
  console.log(props.items);
  return items; 
}