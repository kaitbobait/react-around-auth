//use this component to protect the / route so that unauthorized users can't access it

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// this component can take a component as a prop
// it can also recieve an infinite number of props to pass down
const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
        {props.loggedIn ? <Component {...props} /> : <Redirect to='./login' />}
    </Route>
)}

export default ProtectedRoute; 