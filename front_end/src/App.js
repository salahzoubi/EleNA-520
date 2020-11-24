import React, {Component} from 'react';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MyForm from './MyForm';
import start from './assets/start.png';
import dest from './assets/dest.png';

/**
 * TODO:
 * add slider
 * add stats (differences between different routes, distances)
 * search bar functionality (drop down? or API)
 * POST request to populate nodes and draw polyLines
 */
class App extends Component {

  constructor(){
    super();
    this.state = {
      src: {
        lat: 42.3898,
        lng: -72.5283,
      },
      dest: {
        lat: 42.3819,
        lng: -72.5300,
      },
      zoom: 13
    };
    //TODO populate this
    this.nodes = [];
    this.formSubmit = this.formSubmit.bind(this);
  }

  srcIcon = L.icon({
    iconUrl: start,
    iconSize:     [50, 60], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]
  });

  destIcon = L.icon({
    iconUrl: dest,
    iconSize:     [50, 60], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -86]
  });

  async formSubmit(event, state) {
    event.preventDefault();
    //alert("Start: " + state.startPoint + "\nDest: " + state.destPoint + "\nMethod: " + state.routeType + "\nAlgorithm: " + state.algorithm);
    if(!state.startPoint || !state.destPoint){
      alert('Please enter a start and end destination');
      return;
    }
    if (!state.routeType){
      alert('Please choose your route type');
      return;
    }
    if(!state.algorithm){
      alert('Please choose an algorithm');
      return;
    }
    
    try{
      const slat = parseFloat(state.startPoint[0]);
      const slon = parseFloat(state.startPoint[1]);
      const dlat = parseFloat(state.destPoint[0]);
      const dlon = parseFloat(state.destPoint[1]);

      //TODO change this to only allow coords within Amherst area?
      if(!slat || !slon || !dlat || !dlon || 
        slat < -90 || slat > 90 || slon < -90 || slon > 90 || 
        dlat < -90 || dlat > 90 || dlon < -90 || dlon > 90){
          throw new Error('Invalid coords');
      }
      
      this.setState({
        src: {
          lat: slat,
          lng: slon,
        },
        dest: {
          lat: dlat,
          lng: dlon,
        }
      });
  
      //TODO: POST request to back end
      //TODO: populate nodes
      
    } catch{
      alert('Latitude and longitude must be a comma separated list of coordinates');
      return;
    }
  }

  render(){
    console.log(JSON.stringify(this.state));
    const positionDestIcon = [this.state.dest.lat, this.state.dest.lng];
    const positionSrcIcon = [this.state.src.lat, this.state.src.lng];
    //TODO add polyLines of nodes
    return (
      <Map className="map" center={positionSrcIcon} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionSrcIcon} icon={this.srcIcon}>
          <Popup>
          Start
          </Popup>
        </Marker>
        <Marker position={positionDestIcon} icon={this.destIcon}>
          <Popup>
          Finish
          </Popup>
        </Marker>
        <Polyline color={'red'}
          positions={[
            this.state.src, this.state.dest,
          ]} />
        <Control position="topright" >
          <MyForm 
            formSubmit={this.formSubmit} />
      </Control>
      </Map>
      
    );
  }
}

export default App;
