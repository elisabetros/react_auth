import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function LogIn(props) {
 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [ error, setError ] = useState('')
    // const [user, setUser] = useState([]);

    //validate login data
        const handleSubmit = (e) => {
            // console.log(username, password)
            setError('')
            e.preventDefault()
            if(!username || !password){
                setError('Missing fields')
                return;
            }
            console.log("login")
            axios.post("http://localhost/user/login", {
                username: username,
                password: password
            })
            .then(response => {
                if(response.data.error){
                    setError(response.data.error)
                }
                // console.log(response.data)
            //    const  {username, email, id, first_name, last_name, birthday, created_at} = response.data
                // setUser(response.data)
                props.onLogin(true)
                props.history.push('/profile')
            })
        }


    return(
        <div className="loginPage">
        <form method="post">
            <div className="error">{error}</div>
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
        <Link to="/sendResetEmail">Forgot your Password?</Link>

        </form>
        </div>
    )
}


