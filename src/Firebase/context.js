import React, { useEffect, useState } from 'react';
import { app } from './firebase';

export const FirebaseContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const initialState = {
    currentUser: null,
    loading: false,
  };
  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));
    const subscriber = app.auth().onAuthStateChanged((user) => {
      setState(({
        currentUser: user,
        loading: false,
      }));
      return (() => subscriber());
    });
  }, []);


  return (
    <FirebaseContext.Provider value={{ state }}>
      {children}
    </FirebaseContext.Provider>
  );
};
