import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router,  Link  } from 'react-router-dom';


import isAuthorized from '../custom_hooks/isAuthorized';
import useUserStatus from '../custom_hooks/useUserStatus';

import Movie from '../components/Movie'

const Profile = (props)=> {
  const [ user, setUser ] = useState()
  const [ likedMovies, setMovies ] = useState([])
console.log(likedMovies)
  useEffect(() => {
    let isFetching = true
    
    const fetchOnlineUser = async () => {
      const response = await axios("http://localhost/profile")
        if(isFetching){
            console.log(response.data)
          setUser(response.data)
        }
      }
      const fetchLikedMovies = async () => {
        const response =  await axios('http://localhost/user/liked')
        if(isFetching){
          console.log(response.data)
          setMovies(response.data)
        }
      }
      
      fetchOnlineUser()
      fetchLikedMovies()
    return () => isFetching = false; //unsubscribe
},[]) 

      if(!props.isAuthorized){
        return <h1>Please log in to view your Profile</h1>
      }
          // console.log(user.username)
       	return(
          <div>
            <h1> Welcome {user.username} </h1>
            <h2> Your watchlist</h2>
            {likedMovies.map(movie => {
              console.log(movie)
             return <Movie key={movie.id} movieID={movie.id}/>
            })}
          </div>
        )

}

export default isAuthorized(Profile)
