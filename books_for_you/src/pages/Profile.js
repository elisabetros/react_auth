import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router,  Link  } from 'react-router-dom';


import isAuthorized from '../custom_hooks/isAuthorized';
import useUserStatus from '../custom_hooks/useUserStatus';

const Profile = (props)=> {
  const [ user, setUser ] = useState()
// console.log()
  useEffect(() => {
    let isFetching = true
    
    const fetchOnlineUser = async () => {
      const response = await axios("http://localhost/profile")
        if(isFetching){
            console.log(response.data)
          setUser(response.data)
        }
      }
      fetchOnlineUser()

    return () => isFetching = false; //unsubscribe
},[]) 

      if(!props.isAuthorized){
        return <h1>Please log in to view your Profile</h1>
      }
          // console.log(user.username)
       	return(
          <div>
            <h1> Welcome {user.username} </h1>
            <h2> Your liked books</h2>
          </div>
        )

}

export default isAuthorized(Profile)
