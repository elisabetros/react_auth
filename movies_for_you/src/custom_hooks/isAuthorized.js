import React, { useState, useEffect } from 'react';
import axios from 'axios';

const isAuthorized = ComponentToWrap => props => {
    const [isLoggedIn, setLoginStatus] = useState(false);
     
    useEffect(() => {
      let isFetching = true
      
      const fetchOnlineUser = async () => {
        const response = await axios("http://localhost/user")
          if(isFetching){
            setLoginStatus(response.data)
          }
        }
      fetchOnlineUser()
      return () => isFetching = false; //unsubscribe
},[])

return (
  <ComponentToWrap isAuthorized={isLoggedIn} {...props}/>
);
}

export default isAuthorized