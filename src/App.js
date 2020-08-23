import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './scss/reset.scss';
import PrivateRoute from './routers/PrivateRoute';
import Main from './screen/main';
import Home from './screen/home';
import { AuthProvider } from './Firebase';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/Main" component={Main}/>
          <Route exact path="/" component={Home}/>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
