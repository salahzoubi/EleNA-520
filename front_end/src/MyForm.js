import React, { Component } from "react";
import './App.css';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      routeType: '',
      algorithm: '',
      startPoint: ['42.3898', '-72.5283'],
      destPoint: ['42.3819', '-72.5300']
    };
    this.onRouteRadioChange = this.onRouteRadioChange.bind(this);
    this.onAlgorithmRadioChange = this.onAlgorithmRadioChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onDestChange = this.onDestChange.bind(this);
    //this handler is passed down as a prop
    this.formSubmit = this.formSubmit.bind(this);
  }

  onRouteRadioChange(event) {
    this.setState({
      routeType: event.target.value
    });
  }

  onAlgorithmRadioChange(event) {
    this.setState({
      algorithm: event.target.value
    });
  }

  onStartChange(event) {
    const coords = event.target.value.split(',');
    this.setState({
      startPoint: coords
    });
  }

  onDestChange(event) {
    const coords = event.target.value.split(',');
    this.setState({
      destPoint: coords
    });
  }

  //lift state up to parent App.js
  formSubmit(event) {
    this.props.formSubmit(event, this.state);
  }

  render() {
    return (
      <div className='myForm'>
        <div className="header">EleNA</div> 
        <form onSubmit={this.formSubmit}>

          <div className="endpoint">
            Start:
            <label>
              <input
                className="mytext"
                type="text"
                onChange={this.onStartChange}
                placeholder="Enter latitude, longitude..."
              />
            </label>
          </div>
          
          <br></br>

          <div className="endpoint">
            Dest:
            <label>
              <input
                className="mytext"
                type="text"
                onChange={this.onDestChange}
                placeholder="Enter latitude, longitude..."
              />
            </label>
          </div>

          <h2>Route Options:</h2>

          <div className="radio">
            <label>
              <input
                type="radio"
                value="min"
                checked={this.state.routeType === "min"}
                onChange={this.onRouteRadioChange}
              />
              Minmize Elevation
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="max"
                checked={this.state.routeType === "max"}
                onChange={this.onRouteRadioChange}
              />
              Maximize Elevation
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="fast"
                checked={this.state.routeType === "fast"}
                onChange={this.onRouteRadioChange}
              />
              Fastest Route
            </label>
          </div>
          <h2>Algorithm of choice:</h2>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="astar"
                checked={this.state.algorithm === "astar"}
                onChange={this.onAlgorithmRadioChange}
              />
              A* Search (recommended)
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="djikstra"
                checked={this.state.algorithm === "djikstra"}
                onChange={this.onAlgorithmRadioChange}
              />
              Djikstra's (experimental!)
            </label>
          </div>
          <br />
          <button className="btn" type="submit">
            Calculate Route
          </button>
        </form>
      </div>
    );
  }
}

export default MyForm;