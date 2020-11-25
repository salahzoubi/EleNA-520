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
      zoom: 15,
      nodes: []
    };
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
  
      const r1 = await fetch('/coordinates/$1/$2', [this.state.src.lat, this.state.src.lon]);
      const startNode = await r1.text();
      console.log("Received from backend:\n" + startNode);
      const r2 = await fetch('/coordinates/$1/$2', [this.state.dest.lat, this.state.dest.lon]);
      const destNode = await r2.text();
      console.log("Received from backend:\n" + destNode);

      let n = [];
      if( state.routeType === 'fast' ){
        const r = await fetch('/shortest_path_normal/$1/$2', [ startNode['node'], destNode['node'] ]);
        //n = r.json();
        n = [[42.3898567, -72.528595], [42.3895738, -72.5284761], [42.3895503, -72.5284662], [42.3893817, -72.528392], [42.3891959, -72.5283102], [42.3887436, -72.5281], [42.3883654, -72.5279155], [42.3880893, -72.527918], [42.3879309, -72.5279194], [42.3877174, -72.5278713], [42.3876633, -72.5278434], [42.3873415, -72.5276775], [42.3870088, -72.5276903], [42.3868118, -72.5279713], [42.386784, -72.5279604], [42.3862315, -72.5283635], [42.3860189, -72.5283609], [42.3854147, -72.5284678], [42.384936, -72.5285235], [42.384868, -72.528533], [42.3847075, -72.5285575], [42.3846229, -72.5285718], [42.3844562, -72.5286038], [42.3844116, -72.5285814], [42.3843479, -72.5287057], [42.383668, -72.528536], [42.3836623, -72.5286169], [42.3826429, -72.5292619], [42.3825326, -72.5293216], [42.3824351, -72.5293743], [42.3820827, -72.5293453], [42.3820788, -72.5294496]];
        console.log("Nodes Received:\n" + JSON.stringify(n));
      }
      else if( state.routeType === 'min' ){
        const r = await fetch('/shortest_path_elevate/$1/$2', [ startNode['node'], destNode['node'] ]);
        //n = r.json();
        n = [[42.3898567, -72.528595], [42.3895738, -72.5284761], [42.3895503, -72.5284662], [42.3893817, -72.528392], [42.3891959, -72.5283102], [42.3893268, -72.5277267], [42.3889055, -72.52754], [42.3888268, -72.5275104], [42.3887952, -72.5274717], [42.3883979, -72.5272445], [42.3882476, -72.5272689], [42.3881535, -72.5271377], [42.3880791, -72.5274008], [42.3880909, -72.5271171], [42.3877305, -72.5269478], [42.3876906, -72.5269289], [42.3876444, -72.5269077], [42.3872248, -72.526711], [42.3872487, -72.5266191], [42.387059, -72.5265307], [42.3870832, -72.5264349], [42.3872377, -72.5261716], [42.3873466, -72.5262193], [42.3874164, -72.5258903], [42.3873846, -72.5257512], [42.3870044, -72.5255682], [42.3867265, -72.5254469], [42.3866731, -72.5254251], [42.3864168, -72.5253067], [42.3863333, -72.5252706], [42.3862927, -72.5254762], [42.3857182, -72.5251993], [42.385569, -72.5258871], [42.3855522, -72.5259329], [42.3854628, -72.5258902], [42.3852389, -72.525785], [42.3852249, -72.5258406], [42.3852038, -72.5259301], [42.3849573, -72.5269732], [42.3851876, -72.5270796], [42.3852674, -72.5271105], [42.38588, -72.5273712], [42.386173, -72.5274964], [42.3862603, -72.527569], [42.386211, -72.5276523], [42.3861838, -72.5277239], [42.386784, -72.5279604], [42.3868118, -72.5279713], [42.3866992, -72.5285025], [42.3862315, -72.5283635], [42.3860189, -72.5283609], [42.3854147, -72.5284678], [42.384936, -72.5285235], [42.384868, -72.528533], [42.3847075, -72.5285575], [42.3846229, -72.5285718], [42.3844562, -72.5286038], [42.3844116, -72.5285814], [42.3843479, -72.5287057], [42.3844565, -72.5287103], [42.3844569, -72.5287837], [42.3836623, -72.5286169], [42.3826429, -72.5292619], [42.3825326, -72.5293216], [42.3824351, -72.5293743], [42.3820827, -72.5293453], [42.3820788, -72.5294496]];
        console.log("Nodes Received:\n" + JSON.stringify(n));
      }
      else if( state.routeType === 'max' ){
        alert("Routing by maximal elevation is currently in development, sorry!");
        n = [ [slat, slon], [dlat, dlon] ];
        // const r = await fetch('/shortest_path_elevate/$1/$2', [ startNode['node'], destNode['node'] ]);
        // const data = r.text();
        // console.log(data);
      }
      else{
        console.log("Error!");
      }

      this.setState({
        src: {
          lat: slat,
          lng: slon,
        },
        dest: {
          lat: dlat,
          lng: dlon,
        },
        nodes: n
      });
      
    } catch(err){
      alert('Latitude and longitude must be a comma separated list of coordinates');
      console.log(err);
      return;
    }
  }

  render(){
    const positionDestIcon = [this.state.dest.lat, this.state.dest.lng];
    const positionSrcIcon = [this.state.src.lat, this.state.src.lng];
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
          positions={this.state.nodes} />
        <Control position="topright" >
          <MyForm 
            formSubmit={this.formSubmit} />
      </Control>
      </Map>
      
    );
  }
}

export default App;
