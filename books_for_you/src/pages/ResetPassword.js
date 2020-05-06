import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = ( props) => {
    const [ newPassword, setNewPassword ] = useState('')
    const [ newRepeatPassword, setRepeatPassword ] = useState('')
    const [ error, setError ] = useState('')

    // console.log()
    const handleSubmit = (e) => {
        console.log("click")
        e.preventDefault()
        if(!newPassword || !newRepeatPassword){
            setError('Missing fields')
            return
        }
        if(newPassword !== newRepeatPassword){
            setError('Passwords dont match')
            return
        }
        axios.post('http://localhost/user/resetpassword', {
            id: props.match.params.id,
            newPassword,
            newRepeatPassword
        })
        .then(response => {
            console.log(response.data)
            if(response){
                props.history.push('/login')
            }
    })
}
    return(
        <form>
       <label>New Password<input type="text" name="newPassword" onChange={(e) => setNewPassword(e.target.value)}/></label>
        <label>Repeat New Password<input type="text" name="newRepeatPassword" onChange={(e) => setRepeatPassword(e.target.value)}/></label>
        <button onClick={(e)=>handleSubmit(e)}>Set new Password</button>
    </form>
    )
}

export default ResetPassword;