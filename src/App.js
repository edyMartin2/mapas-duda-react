import React, { Component } from "react";
import PropTypes, { array } from "prop-types";
import "./App.css";
import { themes } from "./service";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import { GoogleMap, Marker } from "react-google-maps";
import { makeStyles } from "@material-ui/core/styles";
import Makers from './components/markers';
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
} from "@material-ui/core/";

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

  return (
    <List className={classes.root}>
      <ListItem>
        <TextField variant="outlined" placeholder="Buscar"></TextField>
      </ListItem>
      <ListItem>
        <Filter filters={props.filters}></Filter>
      </ListItem>
      <Repeat numTimes={props.address}>
        {(index) => (
          <ListItem
            key={index}
            button
            onClick={() => {
              clickButon(props.address[index]);
            }}
          >
            <ListItemText>{props.address[index].name}</ListItemText>
          </ListItem>
        )}
      </Repeat>
    </List>
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
    >
      
       <Makers items = {[{ lat: -20.397, lng: 100.644 },{ lat: -34.397, lng: 150.644 }, { lat: -10.397, lng: 10.644 },{ lat: -14.397, lng: 150.644 }]}/>
    </GoogleMap>
  );
};

const Mymap = withScriptjs(
  withGoogleMap((props) => (
    <MyMapComponent
      isMarkerShown={true}
      center={props.center}
      zoom={props.zoom}
      fil={[{ lat: 19, lng: 20 },{ lat: 100, lng: 22 }]}
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
  alert(item);
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
    address: [
      {
        name: "bermudas",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas2",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas3",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas2",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas3",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas2",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas3",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas2",
        lat: 19,
        long: 100,
      },
      {
        name: "bermudas3",
        lat: 19,
        long: 100,
      },
    ],
    filters: ["filtro 1", "filtro 2", "filtro 3"],
  };
  render() {
    return (
      <div className="App">
        <Grid container>
          <Grid item sm={12} md={2}>
            <Lista
              filters={this.props.filters}
              address={this.props.address}
            ></Lista>
          </Grid>
          <Grid item sm={12} md={10}>
            <Mymap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFdQ7O0MIewEqbyXhW0k9XemMqnYx0aDQ"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              center={{ lat: 20.854885, lng: -20.081807 }}
              zoom={2}
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
