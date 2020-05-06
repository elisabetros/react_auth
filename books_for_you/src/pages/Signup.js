import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router,  Link  } from 'react-router-dom';


const Signup = (props) => {
    const [ firstname, setFirstname ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('')
    const [ error, setError ] = useState()


    const handleSignup = async (e) => {
        e.preventDefault()
        setError('')
        if(!username || !email || !password || !repeatPassword){
            setError('Please fill in required fields 1')
            return
        }        
        if(password !== repeatPassword){
            setError("Passwords don't match")
            return
        }
        if(!error){
            console.log('send to db')   
            await axios.post('http://localhost/user/register', {
                username, email, password, repeatPassword
            }).then(response => {
                console.log(response)
                if(response.data.error){
                   setError('something went wrong try again')
                }else{
                    setError('')
                    props.history.push('/login')
                }
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    return(
        <>
        <p>{error}</p>
        <h1>Sign up</h1>
        <form>
            <label>Firstname<input type="text" onChange={(e) => setFirstname(e.target.value)}/></label>
            <label>Email *<input type="text" onChange={(e) => setEmail(e.target.value)}/></label>
            <label>Username *<input type="text" onChange={(e) => setUsername(e.target.value)}/></label>
            <label>Password *<input type="text" onChange={(e) => setPassword(e.target.value)}/></label>
            <label>Repeat Password *<input type="text" onChange={(e) => setRepeatPassword(e.target.value)}/></label>
            <button onClick={(e) => handleSignup(e)}>Sign up</button>
        </form>
        </>
    )
}

export default Signup