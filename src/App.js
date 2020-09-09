import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './routers/PrivateRoute';
import Main from './screen/main';
import Home from './screen/home';
import { AuthProvider } from './Firebase';
import Register from './components/Register';
import './App.scss';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/Main" component={Main}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Register" component={Register}/>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
