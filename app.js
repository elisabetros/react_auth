const express = require('express')
const app = express()

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

app.get("/", async (req, res) => {
    // const result = await knex.select().from('address')
    // res.send(result)
    res.send({result: await User.query()})
})

//############################


const server= app.listen(80, (err) => {
    if(err){console.log("server couldn't connect");return;}
    console.log('server running on port ', server.address().port)
})