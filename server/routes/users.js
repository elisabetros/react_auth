const router = require('express').Router();

const bcrypt = require('bcrypt')
const saltRounds = 10;

const User = require("../models/User");
let sess;

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
                    req.session.loggedin = true;
                    req.session.username = username;
                    req.session.save()
                    res.send(req.session)
                }
            })
//    return res.send({response: username})
})
router.get('/profile', (req, res) => {
    if(req.session.loggedin){
      console.log(req.session)
    }
     res.send({"response": req.session.username})
      
  });
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