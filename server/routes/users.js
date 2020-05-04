const router = require('express').Router();

const bcrypt = require('bcrypt')
const saltRounds = 10;

const User = require("../models/User");
let sess = null;

router.post('/user/login', async (req, res) => {
    const { username, email, password } = req.body
    sess = req.session;

    if(!username && !password){
    return res.send({response: "missing fields"})
    }
    const users = await User.query().where({ username }).limit(1);
    const user = users[0]

    if(!user){
        return res.status(404).send({ response: 'wrong username' })
    }
        bcrypt.compare(password, user.password, (error, isSame) => {
                if(error){
                    return res.status(500).send({ response: 'error' })
                }
                if(!isSame){
                    return res.status(404).send({ response: 'wrong password' })
                }else{
                    // sess.loggedin = true;
                    sess.user = user
                    sess.isLoggedIn = true
                    req.session.isLoggedIn = true
                    delete sess.user.password
                    res.send(sess.user)
                }
            })
//    return res.send({response: username})
})

router.get('/profile', (req, res) => {
    console.log(sess.user)
    if(sess === null){
        return res.send({response: "you need to log in"})
    }
    res.send(sess.user)
});

router.get('/user', (req, res) => {
    if(sess === null){
        return res.send(false)
    }
    res.send(sess.isLoggedIn)
});

router.get('/user/logout', (req, res) => {
    if(sess=== null){
        return res.send({response: "no one is logged in"})
    }
// 
    req.session.destroy(err => {
        if(err){
            return res.status(401).send({ response: "cannot log out"})
        }
        sess = null
        return res.send({ response: "success"})
    })
})
router.post('/user/register', (req, res) => {
    const { username, email, password, repeatPassword } = req.body

    if(!username && !password && !email && !repeatPassword){
        return res.send({response: "missing fields"})
    }
    if(password.length <8){
        return res.send({response: "passwords too short"})
    }
    if(password !== repeatPassword){
        return res.send({response: "passwords don't match"})
    }
    //if email is not correct form
    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if(error){
            return res.status(500).send({ })
        }
            try{
                // console.log("this newly hashed password",hashedPassword)
                const existingUser =  await User.query().select().where({ username:username }).limit(1)
                if(existingUser[0]){
                    return res.status(500).send({ response: "user already exists"});
                }else{
                    const newUser = await User.query().insert({ 
                        username:username,
                        email:email,
                        password: hashedPassword
                    })
                    return res.status(200).send({ response: newUser })
                }
            }catch(error){
                return res.status(500).send({ response: "something went wrong with the database"});
            }
        })
})

router.post('user/resetPassword', (req, res) => {

})

module.exports = router;