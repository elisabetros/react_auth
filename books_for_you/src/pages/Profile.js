import React, {useState, useEffect} from 'react'
import axios from 'axios';


export default function Profile () {
    const [users, setUsers] = useState([]);
    
        // Connect to the Random User API using axios
        axios("http://localhost/profile")
          // Once we get a response, fetch name, username, email and image data
          // and map them to defined variables we can use later.
              .then(response =>
              console.log(response)
            )
            
       	return(
        <div className="users">
      {users.map(user => (
        <div key={user.id} >
            <h1>{user.username}</h1>
            <p>{user.email}</p>
        </div>
      ))}
      </div>
        )

}

