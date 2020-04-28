import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LogOut (props) {

    useEffect(() => {
        axios('http://localhost/user/logout')
        .then(response => {
            // console.log(response)
            if(response.data.response === "success"){
                props.onUserAction({path:"/login", action: "Log In"})
                props.onLogout([])
                props.history.push('/')
            }
        })

    },[])

    return(
        <div>
          
        </div>
    )

}