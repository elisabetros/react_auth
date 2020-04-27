import React, { useState } from 'react'
import axios from 'axios'

export default function LogIn(props) {
    // console.log(props)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //validate login data

        const handleSubmit = (e) => {
            console.log(username, password)
            e.preventDefault()
            console.log("login")
            axios.post("http://localhost/user/login", {
                username: username,
                password: password
            })
            .then(response => {
                console.log(response.data)
                // props.history.push("/profile")
            })
        }

    
    return(
        <form method="post">
            <h2>Please log in</h2>
            <label >
                Username
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input type="text" onChange={(e) => setPassword(e.target.value)}/>   
            </label>
                
            <button  onClick={(e)=> handleSubmit(e) }>Log in</button>

        </form>
    )
}


