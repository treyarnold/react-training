import React from 'react';

const charComponent = (props) => {
  const style = {
    display: "inline-block",
    padding: "1rem",
    border: "1px solid black",
    cursor: "pointer",
    margin: ".5rem"
  }

  return (<span onClick={props.click} style={style}>{props.letter}</span>)
}

export default charComponent;