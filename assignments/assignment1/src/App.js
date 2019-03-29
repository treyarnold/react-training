import React, { Component } from 'react';
import './App.css';
import UserInput from "./IO/UserInput"
import UserOutput from "./IO/UserOutput"

class App extends Component {
  state = {
    name: "Trey",
  }

  nameSwitchHandler = newName => {
    this.setState({
      name: newName
    })
  }

  nameChanged = event => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <UserOutput 
          click={this.nameSwitchHandler.bind(this, "Billy-Bob")} 
          name={this.state.name} />
        <UserInput 
          name={this.state.name}
          changed={this.nameChanged}/>
      </div>
    );
  }
}

export default App;
