import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import './App.css';

import Profile from './pages/Profile'

class App extends Component {
  state = {
    isLoading : true
  }
  render() {
    return (
      
      <div className="App">
      <Router>
        <nav>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          {/* <li><Link to=''></Link></li> */}
        </nav>
    
     
        
      <Switch>
        <Route path='/profile'
        component={() => <Profile/>}/>    
      </Switch>
      </Router>
      </div>
    )
  }

}

export default App;
