import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Signin from './components/Signin';
import Signup from './components/Signup';




class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div className="App">
          <div>
            <Switch>
              <Route path='/' exact component={Signin} />
              <Route path='/Signup' exact component={Signup} />
            </Switch>
          </div> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
