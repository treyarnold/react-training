import React from 'react'
import classes from './Cockpit.module.css'

const cockpit = (props) => {
  const assignedClasses = [];
  let btnClass = "";
  
  if (props.showPersons) btnClass = classes.red;
  if (props.persons.length <= 2) assignedClasses.push(classes.red);
  if (props.persons.length <= 1) assignedClasses.push(classes.bold);

  return (
    <div className={classes.Cockpit}>
      <h1>Hi, I'm a Reach app</h1>
      <p className={assignedClasses.join(" ")}>This works</p>
      <button  
        className ={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
    </div>
    );
};

export default cockpit;