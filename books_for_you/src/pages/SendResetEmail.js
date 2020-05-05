import React, { useState, useEffect } from "react"
import axios from "axios"

// import PasswordForm from '../components/PasswordForm'

const SendResetEmail = (props) => {
   const [ email, setEmail ] = useState('')

    const handleSubmitEmail = (e) => {
        e.preventDefault()
        axios.post('http://localhost/sendResetEmail', {
            email
        })
        .then(response => {
            console.log(response.data)
            // if(response){
            //    return (
            //        <h1> You will receive an email shortly</h1>
            //    )
            // }
    })
    }


    return(
        <form>
            <label>Email address<input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/></label>
            <button onClick={(e)=>handleSubmitEmail(e)}>Set new Password</button>
        </form>
    )
}


export default SendResetEmail

