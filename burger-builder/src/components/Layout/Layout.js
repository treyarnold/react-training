import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

console.log(classes);

const layout = props => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;