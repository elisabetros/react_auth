const router = require('express').Router();
const credentials = require("../config/emailcredentials")
const nodemailer = require('nodemailer')

const bcrypt = require('bcrypt')
const saltRounds = 10;

const User = require("../models/User");

sess = false;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: credentials.username,
        pass: credentials.password
    }
  });

router.post('/user/login', async (req, res) => {
    const { username, email, password } = req.body
    sess = req.session;

    if(!username && !password){
    return res.send({error: "missing fields"})
    }
    const users = await User.query().where({ username }).limit(1);
    const user = users[0]

    if(!user){
        return res.status(404).send({ error: 'wrong username' })
    }
        bcrypt.compare(password, user.password, (error, isSame) => {
                if(error){
                    return res.status(500).send({ error: 'error' })
                }
                if(!isSame){
                    return res.status(404).send({ error: 'wrong password' })
                }else{
                    // sess.loggedin = true;
                    sess.user = user
                    sess.isLoggedIn = true
                    req.session.isLoggedIn = true
                    req.session.user = user
                    delete sess.user.password
                    res.send(sess.user)
                }
            })
//    return res.send({response: username})
})

router.get('/profile', (req, res) => {
    // console.log(sess.user)
    if(!sess){
        return res.send({error: "you need to log in"})
    }
    res.send(sess.user)
});

router.get('/user', (req, res) => {
    if(!sess){
        return res.send(false)
    }
    res.send(sess.isLoggedIn)
});

router.get('/user/logout', (req, res) => {
    if(!sess){
        return res.send({error: "no one is logged in"})
    }
// 
    req.session.destroy(err => {
        if(err){
            return res.status(401).send({ error: "cannot log out"})
        }
        sess = null
        return res.send({ response: "success"})
    })
})
router.post('/user/sendResetLink', async (req, res) => {
    const { email } = req.body
    if(!email){
        return res.send({error: 'missing fields'})
    }
    // if email is not an email
    const user = await User.query().select().where({ email })
    if(!user[0]){
        return res.send({error: 'no user with this email'})
    }
    const mailOptions = {
        from: credentials.username,
        to: email,
        subject: 'Reset password',
        html: `<div>reset password <a href="http://localhost:3000/resetpassword/${user[0].id}">here</a></div>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        //   console.log(error);
          return res.send({error: 'error'})
        } else {
        //   console.log('Email sent: ' + info.response);
          return res.send({response: 'Email sent: ' + info.response});
        }
      });
})

router.post('/user/resetpassword/', async (req, res) => {
    // return res.send(sess.user)
    const { id,  newPassword, newRepeatPassword } = req.body

    if(!newPassword && !newRepeatPassword){
        return res.send({error: 'missing fields'})
    }
    if(newPassword !== newRepeatPassword){
        return res.send({error: "passwords don't match"})
    }
    const existingUser =  await User.query().select().where({ id }).limit(1)
    if(!existingUser[0]){
        return res.status(500).send({ error: "no user with that information"});
    }
    bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
        if(error){
            return res.status(500).send({ error: "couldn't hash password" })
        }
        try{
            const updatedUser = await User.query().update({ 
                password: hashedPassword
            }).where({ id })
            return res.status(200).send(true)

        }catch(error){
            return res.status(500).send({ error: "something went wrong with the database"});
        }
    })
})

router.post('/user/register', (req, res) => {
    const { username, email, password, repeatPassword } = req.body

    if(!username && !password && !email && !repeatPassword){
        return res.send({error: "missing fields"})
    }
    if(password.length <8){
        return res.send({error: "passwords too short"})
    }
    if(password !== repeatPassword){
        return res.send({error: "passwords don't match"})
    }
    //if email is not correct form
    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if(error){
            return res.status(500).send({ error: "couldn't hash password" })
        }
            try{
                // console.log("this newly hashed password",hashedPassword)
                const existingUser =  await User.query().select().where({ username:username }).limit(1)
                if(existingUser[0]){
                    return res.status(500).send({ error: "user already exists"});
                }else{
                    const newUser = await User.query().insert({ 
                        username:username,
                        email:email,
                        password: hashedPassword
                    })
                    return res.status(200).send({ response: newUser })
                }
            }catch(error){
                return res.status(500).send({ error: "something went wrong with the database"});
            }
        })
})



module.exports = router;