import React from 'react';

const userInput = props => {
    return (
        <input type="text" onChange={props.changed} value={props.name}></input>
    )
}

export default userInput