import React, { Component } from "react";
import './App.css';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      selectedOption: '',
      startPoint: ['42.3898', '-72.5283'],
      destPoint: ['42.3819', '-72.5300']
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onDestChange = this.onDestChange.bind(this);
    //this handler is passed down as a prop
    this.formSubmit = this.formSubmit.bind(this);
  }

  onRadioChange(event) {
    this.setState({
      selectedOption: event.target.value
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
          <br></br>
          <br></br>

          <div className="endpoint">
            Start:
            <label>
              <input
                className="mytext"
                type="text"
                onChange={this.onStartChange}
              />
            </label>
          </div>
          
          <br></br>
          <br></br>

          <div className="endpoint">
            Dest:
            <label>
              <input
                className="mytext"
                type="text"
                onChange={this.onDestChange}
              />
            </label>
          </div>

          <br></br>
          <br></br>

          <div className="radio">
            <label>
              <input
                type="radio"
                value="min"
                checked={this.state.selectedOption === "min"}
                onChange={this.onRadioChange}
              />
              Minmize Elevation
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="max"
                checked={this.state.selectedOption === "max"}
                onChange={this.onRadioChange}
              />
              Maximize Elevation
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="fast"
                checked={this.state.selectedOption === "fast"}
                onChange={this.onRadioChange}
              />
              Fastest Route
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