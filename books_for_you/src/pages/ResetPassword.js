import React, { useState } from "react";
import axios from 'axios'

const ResetPassword = (props) => {
    const [ oldPassword, setOldPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ newRepeatPassword, setRepeatPassword ] = useState('')

    const handleSubmit = (e) => {
        console.log("click")
        e.preventDefault()
        axios.post('http://localhost/user/resetpassword', {
            oldPassword,
            newPassword,
            newRepeatPassword
        })
        .then(response => {
            console.log(response.data)
            if(response){
                props.history.push('/profile')
            }
    })
}
    return(
        <form>
        <label>Old Password<input type="text" name="oldPassword" onChange={(e) => setOldPassword(e.target.value)}/></label>
        <label>New Password<input type="text" name="newPassword" onChange={(e) => setNewPassword(e.target.value)}/></label>
        <label>Repeat New Password<input type="text" name="newRepeatPassword" onChange={(e) => setRepeatPassword(e.target.value)}/></label>
        <button onClick={(e)=>handleSubmit(e)}>Set new Password</button>
    </form>
    )
}

export default ResetPassword;