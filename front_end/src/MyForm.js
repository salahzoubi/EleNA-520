import React, { Component } from "react";
import './App.css';

class MyForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      selectedOption: '',
      startPoint: '',
      destPoint: ''
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onDestChange = this.onDestChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onRadioChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  onStartChange(event) {
    this.setState({
      startPoint: event.target.value
    });
  }

  onDestChange(event) {
    this.setState({
      destPoint: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    alert("Start: " + this.state.startPoint + "\nDest: " + this.state.destPoint + "\nMethod: " + this.state.selectedOption)
  }

  render() {
    return (
      
      <div className='myForm'>
        <form onSubmit={this.formSubmit}>
        <header className="navbar">EleNA</header> 
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