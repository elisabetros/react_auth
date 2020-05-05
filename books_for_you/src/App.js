import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch  } from 'react-router-dom';
import './App.css';

import Login from './pages/Login'
import Logout from './components/Logout'
import Profile from './pages/Profile'
import Home from './pages/Home'

// import apiKey from './config/apiCredentials'

import isAuthorized from './custom_hooks/isAuthorized'
import MovieReview from './pages/MovieReview';
import SendResetEmail from './pages/SendResetEmail';
import ResetPassword from './pages/ResetPassword'

// import axios from 'axios';

const App =  (props) => {
  console.log(props)
  const [ isLoading, setLoadingStatus ] = useState(true)
  // const [ user, setUser ] = useState(true)
  const [ isLoggedIn, setLoggedInStatus ] = useState(false)
 

   useEffect(() => {
     if(props.isAuthorized){
      setLoggedInStatus(true)
     }
   }, [props.isAuthorized])
  

 const handleAction = (newStatus) => {
   setLoggedInStatus(newStatus)
 }
  
//  const handleLogout = (newValue) => {
//   setLoggedInStatus(newValue)
// //    setUser(newValue)
//  }
  
    return (      
      <div className="App">
      <Router>
        <nav>
          <li><NavLink activeClassName="active" exact to='/'>Home</NavLink></li>
          <li><NavLink activeClassName="active" to='/profile'>Profile</NavLink></li>
          {!isLoggedIn
          ? <li><NavLink activeClassName="active" to='/login'>Log in</NavLink></li>
          : <li><Logout onLogout={handleAction}/></li>
            }
        </nav>
    
     
        
      <Switch>
        <Route exact path='/'
        component={() => <Home/>}/>    

        <Route path='/profile'
        component={() => <Profile/>}/> 

        <Route path='/login'
        component={(props) => <Login {...props} onLogin={handleAction} />}/>  

        <Route path='/movieReview/:id'
        component={(props) => <MovieReview {...props}/>}/>   

        <Route path='/sendResetEmail' 
        component={(props) => <SendResetEmail {...props} />}/>
        
        <Route path="/resetPassword" 
        component={() => <ResetPassword/> }/>
        
      </Switch>
      </Router>
      </div>
    )
}

export default isAuthorized(App);
