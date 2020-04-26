import React, {useState, useEffect} from 'react'
import axios from 'axios';


export default function Profile () {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
      console.log('bla')
        // Connect to the Random User API using axios
        axios("http://localhost/users")
          // Once we get a response, fetch name, username, email and image data
          // and map them to defined variables we can use later.
         
            .then(response =>
              response.data.map(user => ({
                username: user.username,
                email: user.email,
                id: user.id
              }))
            )
            .then(data => {
              console.log(data)
              setUsers(data);
            });
        }, []);


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

