import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Profile= ()=> {
    const [user, setUser] = useState([]);
    useEffect(()=>{

      axios("http://localhost/profile")
            .then(response =>{
              console.log(response.data)
              setUser(response.data)
              // console.log("state user", user)
            })
    }, [])
            
            
       	return(
          <div>
            <h1>Welcome {user.username}</h1>
          </div>
        )

}

export default Profile
