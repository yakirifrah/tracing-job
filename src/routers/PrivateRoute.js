import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { state: { currentUser } } = useContext(FirebaseContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !!currentUser ? <RouteComponent {...props} /> : <Redirect to="/"/>
      }
    />

  );
}

export default PrivateRoute;
