import { useState, useEffect } from 'react';
import axios from 'axios';

const useOnlineStatus = () => {
    const [user, setUser] = useState();
     
    useEffect(() => {
      let isFetching = true
      // console.log("fetching")
      axios("http://localhost/profile")
      .then(response => {
        if(isFetching){
          setUser(response.data)
        }
      })
      
      return () => isFetching = false; //unsubscribe
},[])
return {...user};
}

export default useOnlineStatus