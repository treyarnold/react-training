import React, { Component } from 'react';
import styles from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id:"sadf", name: "Trey", age: 39},
      { id:"2314", name: "Max", age: 28},
      { id:"dsafbv", name: "Manu", age: 29},
    ],
    showPersons: false,
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    }; 

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
    }    

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: ".5rem",
      cursor: "pointer",
    };

    let persons = null;

    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}          
        </div> 
      )
      style.backgroundColor = "red";
    }

    const classes = [];
    if (this.state.persons.length <= 2) classes.push(styles.red);
    if (this.state.persons.length <= 1) classes.push(styles.bold);
    
    return (
      <div className={styles.app}>
        <h1>Hi, I'm a Reach app</h1>
        <p className={classes.join(" ")}>This works</p>
        <button style={style} 
          onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}          
      </div>
    );
  }
}

export default App;
