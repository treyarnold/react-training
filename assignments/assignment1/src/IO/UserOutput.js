import React from 'react';

const userOutput = props => {
    return (
        <div>
            <p onClick={props.click}>My name is {props.name}</p>
            <p>lorem and shit</p>
        </div>
    )
}

export default userOutput