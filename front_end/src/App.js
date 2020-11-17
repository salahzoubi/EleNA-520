import React, {Component} from 'react';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import start from './assets/start.png';
import dest from './assets/dest.png';


class App extends Component {
  
  state = {
    srcIcon: {
      lat: 42.3898,
      lng: -72.5283,
    },
    destIcon: {
      lat: 42.3819,
      lng: -72.5300,
    },
    zoom: 13
  }


  srcIcon = L.icon({
    iconUrl: start,
    // shadowUrl: leafShadow,
    iconSize:     [50, 60], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]
  });

  destIcon = L.icon({
    iconUrl: dest,
    // shadowUrl: leafShadow,
    iconSize:     [50, 60], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -86]
  });

  render(){
    const positionDestIcon = [this.state.destIcon.lat, this.state.destIcon.lng];
    const positionSrcIcon = [this.state.srcIcon.lat, this.state.srcIcon.lng];
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
      </Map>
      
    );
  }
}

export default App;
