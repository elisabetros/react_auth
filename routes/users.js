const router = require('express').Router();

const bcrypt = require('bcrypt')
const saltRounds = 10;

const User = require("../models/User");

router.post('/user/register', (req, res) => {
    const { username, email, password, repeatPassword } = req.body
    if(!password && !email && !repeatPassword){
        return res.send({response: "missing fields"})
    }
    if(password.length <8){
        return res.send({response: "passwords too short"})
    }
    if(password !== repeatPassword){
        return res.send({response: "passwords don't match"})
    }
    return res.send({response:"user email: " + email})
    
    
})

module.exports = router;