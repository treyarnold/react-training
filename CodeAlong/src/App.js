import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: "Trey", age: 39},
      { name: "Max", age: 28},
      { name: "Manu", age: 29},
    ]
  }

  switchNameHandler = (newName) => {
    // console.log("clicked", this);
    this.setState({
      persons: [
        { name: newName, age: 39},
        { name: "Max", age: 28},
        { name: "Manu", age: 9},
      ]});
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: "Trey", age: 39},
        { name: "Max", age: 28},
        { name: event.target.value, age: 9},
      ]});
  }

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: ".5rem",
      cursor: "pointer"
    };
    return (
      <div className="App">
        <h1>Hi, I'm a Reach app</h1>
        <p>This works</p>
        <button style={style} onClick={() => this.switchNameHandler("James")}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, "James!!!")}>My Hobbies: Racing</Person>
        <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age}
        changed={this.nameChangedHandler}/>
      </div>
    );
  }
}

export default App;
