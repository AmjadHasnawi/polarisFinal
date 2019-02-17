import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Upload from './components/uploadCertification';
import Employee from './components/Employee';
import Manager from './components/Manager';
import User from './components/User';








class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div className="App">
          <div>
            <Switch>
              <Route path='/' exact component={Signup} />
              <Route path='/Signin' exact component={Signin} />
              <Route path='/Upload' exact component={Upload} />
              <Route path='/Employee' exact component={Employee} />
              <Route path='/Manager' exact component={Manager} />
              <Route path='/User' exact component={User} />
            </Switch>
          </div> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
