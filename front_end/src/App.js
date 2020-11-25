import React, {useState, useEffect,Component} from 'react';
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
    this.nodes = [this.state.src, this.state.dest];
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
  
      const r1 = await fetch('http://localhost:5000/coordinates/' + this.state.src.lat + '/' +this.state.src.lon );
      const startNode = await r1.text();
      console.log(startNode);
      const r2 = await fetch('http://localhost:5000/coordinates/$1/$2', [this.state.dest.lat, this.state.dest.lon]);
      const destNode = await r2.text();
      console.log(destNode);


//
      if( state.routeType === 'fast' ){
        const r = await fetch('/shortest_path_normal/$1/$2', [ startNode['node'], destNode['node'] ]);
        const data = r.text();
        console.log(data);
      }

      //TODO: update fetch paths to min or max elevation
      //TODO: populate nodes
      
    } catch(err){
      alert('Latitude and longitude must be a comma separated list of coordinates');
      console.log(err);
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
          positions={this.nodes} />
        <Control position="topright" >
          <MyForm 
            formSubmit={this.formSubmit} />
      </Control>
      </Map>
      
    );
  }
}

export default App;
