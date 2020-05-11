import { useState, useEffect } from 'react'
import axios from 'axios'

const useUserStatus = () => {
    const [ user, setUser ] = useState()

    useEffect(() => {
        let isFetching = true
        
        const fetchOnlineUser = async () => {
          const response = await axios("http://localhost/user")
            if(isFetching){
                console.log(response.data)
              setUser(response.data)
            }
          }
        fetchOnlineUser()
        return () => isFetching = false; //unsubscribe
  },[])

    return {...user}
}

export default useUserStatus