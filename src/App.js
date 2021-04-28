import React, { Component, useState, useEffect } from "react";
import PropTypes, { array } from "prop-types";
import "./App.css";
import { themes } from "./service";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { makeStyles } from "@material-ui/core/styles";
import Makers from "./components/markers";
import { createStore } from "redux";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
} from "@material-ui/core/";
import axios from "axios";

function counterReducer(
  state = { value: { lat: 24.123423714090276, lng: -102.38218518677078 } },
  action
) {
  switch (action.type) {
    case "set":
      state.value = action.latlong;
    default:
      return state;
  }
}
const store = createStore(counterReducer);

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflow: "auto",
    maxHeight: 390,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const Lista = (props) => {
  const classes = useStyles();

  const [search, setSearch] = React.useState();
  const [address, setAddress] = React.useState(props.address);
  const filterChange = (item) => {
    setSearch(item.target.value);
  };

  useEffect(() => {
    var config = {
      method: "post",
      url: "http://localhost:8000/api/maps",
      headers: {
        Cookie: "PHPSESSID=87v649f74jvfn1se8tivjqvv02",
      },
    };

    axios(config)
      .then(function (response) {
        setAddress(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Grid container>
      <Grid item sm={2}>
        <List className={classes.root}>
          <ListItem>
            <TextField
              variant="outlined"
              placeholder="Buscar"
              value={search}
              onChange={filterChange}
            ></TextField>
          </ListItem>
          <ListItem>
            <Filter filters={props.filters}></Filter>
          </ListItem>
          <Repeat numTimes={props.address}>
            {(index) => (
              <ListItem
                key={index}
                button
                onMouseEnter={() => {
                  let arr = [];
                  arr.push(props.address[index]);
                  setAddress(arr);
                }}
                onMouseLeave={() => {
                  setAddress(props.address);
                }}
              >
                <ListItemText>{props.address[index].name}</ListItemText>
              </ListItem>
            )}
          </Repeat>
        </List>
      </Grid>
      <Grid item sm={12} md={10}>
        <InitMap address={address}></InitMap>
      </Grid>
    </Grid>
  );
};
const { string, bool, oneOf } = PropTypes;

const MyMapComponent = (props) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
      zoom={props.zoom}
      onClick={() => {
        console.log(props.address);
      }}
    >
      {/*  [{ lat: -20.397, lng: 100.644 },{ lat: -34.397, lng: 150.644 }, { lat: -10.397, lng: 10.644 },{ lat: -14.397, lng: 150.644 }] */}
      <Makers items={props.address} />
    </GoogleMap>
  );
};

const Mymap = withScriptjs(
  withGoogleMap((props) => (
    <MyMapComponent
      isMarkerShown={true}
      center={props.center}
      zoom={props.zoom}
      address={props.address}
    />
  ))
);

const Repeat = (props) => {
  let item = [];
  for (let i = 0; i < props.numTimes.length; i++) {
    item.push(props.children(i));
  }

  return <div>{item}</div>;
};

const clickButon = (item) => {
  store.dispatch({ type: "set", latlong: item });
  console.log(store.getState());
};

const Filter = (props) => {
  const [filter, setFilter] = React.useState(null);
  const filterChange = (item) => {
    setFilter(item.target.value);
  };
  return (
    <TextField
      variant="outlined"
      select
      placeholder="Filtros"
      value={filter}
      SelectProps={{
        native: true,
      }}
      onChange={filterChange}
    >
      {props.filters.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </TextField>
  );
};

const InitMap = (props) => {
  return (
    <Mymap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFdQ7O0MIewEqbyXhW0k9XemMqnYx0aDQ"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      center={store.getState().value}
      zoom={5}
      address={props.address}
    ></Mymap>
  );
};

class App extends Component {
  static propTypes = {
    theme: oneOf(themes),
    bw: bool,
    userName: string,
    type: oneOf(["list", "gallery"]),
    backToList: string,
    address: array,
    filters: array,
  };

  static defaultProps = {
    userName: "My",
    theme: "sports",
    type: "list",
    backToList: "Back to list",
    data: {
      address: [
        {
          name: "Mexico City",
          lat: 24.123423714090276,
          lng: -102.3821851867707,
          filters: "mexico verder",
        },
      ],
      filters: ["filtro 1", "filtro 2", "filtro 3"],
      api: "http://localhost:8000/api/maps",
    },
  };

  render() {
    return (
      <Lista
        filters={this.props.data.filters}
        address={this.props.data.address}
      ></Lista>
    );
  }
}

export default App;

//<MyMapComponent isMarkerShown />// Map with a Marker
//<MyMapComponent isMarkerShown={false} />// Just only Map
