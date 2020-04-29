import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router,  Link  } from 'react-router-dom';

import useOnlineStatus from '../custom_hooks/useOnlineStatus'

const Profile = ()=> {
  // console.log(useOnlineStatus())
    // const [user, setUser] = useState([]);
    const user = useOnlineStatus()
    // console.log(user)
    
    

   const returnGreeting = ()=> {

      if(user.username){
        return <h1>Welcome {user.username}</h1>
      }
      else{
        return <h1>Please log in to view your Profile</h1>
      }
    }
    
    
       	return(
          <div>
            {returnGreeting()}
            <h2>Your liked books</h2>
          </div>
        )

}

export default Profile
