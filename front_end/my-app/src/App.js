import React, {Component} from 'react';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import src from './assets/start.jpg';
import dest from './assets/dest.png';
// import leafGreen from './assets/leaf-green.png';
// import leafRed from './assets/leaf-red.png';
// import leafOrange from './assets/leaf-orange.png';
// import leafShadow from './assets/leaf-shadow.png';

class App extends Component {
  
  state = {
    srcIcon: {
      lat: 35.787449,
      lng: -78.6438197,
    },
    destIcon: {
      lat: 35.774416,
      lng: -78.633271,
    },
    // orangeIcon: {
    //   lat: 35.772790,
    //   lng: -78.652305,
    // },
    zoom: 13
  }


  srcIcon = L.icon({
    iconUrl: src,
    // shadowUrl: leafShadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]
  });

  destIcon = L.icon({
    iconUrl: dest,
    // shadowUrl: leafShadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -86]
  });

  // orangeIcon = L.icon({
  //   iconUrl: leafOrange,
  //   shadowUrl: leafShadow,
  //   iconSize:     [38, 95], // size of the icon
  //   shadowSize:   [50, 64], // size of the shadow
  //   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //   shadowAnchor: [4, 62],  // the same for the shadow
  //   popupAnchor:  [-3, -86]
  // });

  render(){
    const positionDestIcon = [this.state.destIcon.lat, this.state.destIcon.lng];
    const positionSrcIcon = [this.state.srcIcon.lat, this.state.srcIcon.lng];
    // const positionOrangeIcon = [this.state.orangeIcon.lat, this.state.orangeIcon.lng];
    return (
      <Map className="map" center={positionSrcIcon} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionSrcIcon} icon={this.srcIcon}>
          <Popup>
          I am a green leaf
          </Popup>
        </Marker>
        <Marker position={positionDestIcon} icon={this.destIcon}>
          <Popup>
          I am a red leaf
          </Popup>
        </Marker>
        {/* <Marker position={positionOrangeIcon} icon={this.orangeIcon}>
          <Popup>
          I am an orange leaf
          </Popup>
        </Marker> */}
      </Map>
      
    );
  }
}

export default App;
