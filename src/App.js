import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { themes } from "./service";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import { GoogleMap, Marker } from "react-google-maps";
import { List, ListItem, ListItemText, Grid } from "@material-ui/core/";
const { string, bool, oneOf } = PropTypes;
const MyMapComponent = (props) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
      zoom={props.zoom}
    >
      <Marker position={{ lat: -20.397, lng: 100.644 }}></Marker>
      <Marker position={{ lat: -34.397, lng: 150.644 }}></Marker>
    </GoogleMap>
  );
};

const Mymap = withScriptjs(
  withGoogleMap((props) => (
    <MyMapComponent
      isMarkerShown={true}
      center={props.center}
      zoom={props.zoom}
    />
  ))
);

class App extends Component {
  static propTypes = {
    theme: oneOf(themes),
    bw: bool,
    userName: string,
    type: oneOf(["list", "gallery"]),
    backToList: string,
  };

  static defaultProps = {
    userName: "My",
    theme: "sports",
    type: "list",
    backToList: "Back to list",
  };

  render() {
    return (
      <div className="App">
        <Grid container>
          <Grid item sm={12} md={2}>
            <List>
              <ListItem>
                <ListItemText>Hola</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={12} md={10}>
            <Mymap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFdQ7O0MIewEqbyXhW0k9XemMqnYx0aDQ"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              center={{ lat: 20.854885, lng: -20.081807 }}
              zoom={15}
            ></Mymap>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;

//<MyMapComponent isMarkerShown />// Map with a Marker
//<MyMapComponent isMarkerShown={false} />// Just only Map
