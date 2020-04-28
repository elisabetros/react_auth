import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import './App.css';

import Login from './pages/Login'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import Home from './pages/Home'

import axios from 'axios';

const App = () => {
  const[ isLoading, setLoadingStatus ] = useState(true)
  const[ user, setUser ] = useState()
  const[ userStatus, setUserStatus ] = useState({
    path: "/login",
    action: "Log in"
  })

  useEffect(() =>{
    axios('http://localhost/profile')
    .then(response => {
      if(response.data.username){
        setUser(response.data)
        setUserStatus({
          path: "/logout",
    action: "Log Out"
        })
      }
    })
  },[])
  
 const handleAction = (newStatus) => {
   setUserStatus(newStatus)
 }
  
 const handleLogout = (newValue) => {
   setUser(newValue)
 }
  
    return (
      
      <div className="App">
      <Router>
        <nav>
          <li><Link to='/'>Home</Link></li>
          <li><Link to={userStatus.path}>{userStatus.action}</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          {/* <li><Link to=''></Link></li> */}
        </nav>
    
     
        
      <Switch>
        <Route path='/profile'
        component={() => <Profile/>}/>    
        <Route path='/'
        component={() => <Home/>}/>    
        <Route path='/login'
        component={(props) => <Login {...props} onUserAction={handleAction} />}/>    
        <Route path='/logout'
        component={(props) => <Logout {...props} onUserAction={handleAction} onLogout={handleLogout}/>}/>    
      </Switch>
      </Router>
      </div>
    )
}



export default App;
