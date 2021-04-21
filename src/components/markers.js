import React, { Component } from "react";
import { Marker } from "react-google-maps";
export default function Makers(props) {
   
  let items = [];  
  for (let i = 0; i < 10; i++) {
     items.push(<Marker position={props.items[i]}></Marker>);
  }
  return items
}
