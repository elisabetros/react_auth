const express = require('express')
const app = express()
const session = require('express-session')


// set up the session 
app.use(session({
    secret: 'kari alvitri',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// const UserModel = import('./models/User')
// console.log(UserModel)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// ########################
// SETUP DATABASE

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development)

// Give the knex instance to objection
Model.knex(knex)


//#### set up routes with our server instance ###
const userRoute = require('./routes/users')

app.use(userRoute)


// ########################
const User = require('./models/User.js')


app.get("/users", async (req, res) => {
    const result = await User.query().select().from('user')
    res.header("Access-Control-Allow-Origin", "*");
    res.send(result)
})

//############################


const server= app.listen(80, (err) => {
    if(err){console.log("server couldn't connect");return;}
    console.log('server running on port ', server.address().port)
})