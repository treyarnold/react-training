import React, { Component } from 'react';
import './App.css';
import Validation from './Validation'
import Char from './Char'

class App extends Component {
  state= {
    chars: "",
    length: 0,
  };

  charChangeHandler = event => {
    const chars = event.target.value;
    const length = chars.length;
    this.setState({
      chars: chars,
      length: length});
  };

  charDeleteHandler = (index) => {
    const lettersArray = this.state.chars.split("");
    lettersArray.splice(index,1);
    const chars = lettersArray.join("");
    const length = chars.length;
    this.setState({
      chars: chars,
      length: length
    });
  }

render() {
  const lettersArray = this.state.chars.split("");
  const letters = (
    <div>
      {lettersArray.map((char, index) => {
        return <Char 
          click={() => this.charDeleteHandler(index)} 
          letter={char}
          key={index}/>
      })}
    </div>
  )

  return (
    <div className="App">
      <input type="text" onChange={event => this.charChangeHandler(event)} value={this.state.chars}></input>
      <p>{this.state.length}</p>
      <Validation length={this.state.length}/>
      {letters}
    </div>
  );
  }
}

export default App;
