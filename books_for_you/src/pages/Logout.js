import React, { useState, useEffect } from 'react'
import axios from 'axios'
import isAuthorized from '../custom_hooks/isAuthorized'

const LogOut = (props) => {

    const handleLogout = () => {


        axios('http://localhost/user/logout')
        .then(response => {
            // console.log(response)
            if(response.data.response === "success"){
                props.onLogout(false)
            }   
        })

    }

    return(
        <button onClick={handleLogout}>Log Out</button>
    )

}
export default isAuthorized(LogOut)