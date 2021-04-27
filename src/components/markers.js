import React, { Component } from "react";
import { Marker, GoogleApiWrapper, Polyline } from "react-google-maps";

const click = function onMarkerClick(data) {
  alert(data);
};
export default function Makers(props) {
  let items = [];
  for (let i = 0;i < props.items.length ; i++) {
    
    items.push(
      <Marker
        position={props.items[i]}
        onClick={() => {
          click(props.items[i].name);
        }}
      >
        
      </Marker>
    );
  }
  return items;
}
