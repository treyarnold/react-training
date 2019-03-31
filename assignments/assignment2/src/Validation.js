import React from 'react';

const validation = props => {
  return (
    <div>
      {
        props.length > 5 ?
        <p>Text long enough</p> :
        <p>Text too Short</p> 
      }
    </div>
  )
};

export default validation