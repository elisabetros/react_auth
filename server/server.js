const express = require('express')
const app = express()
const session = require('express-session')
var cors = require('cors');

app.use(cors({
  credentials: true
  }));

const rateLimit = require('express-rate-limit')

// const authLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 4 // limit each IP to 4 requests per windowMs
// })
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie:  { 
      maxAge: 1000 * 60 * 60 * 24,
      secure:true
     }
  }))



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
let sess;

// ########################
const User = require('./models/User.js')


app.get("/users", async (req, res) => {
 
    const result = await User.query().select().from('user')
    res.header("Access-Control-Allow-Origin", "*");
    res.send(result)
})



//############################


const server = app.listen(80, (err) => {
    if(err){console.log("server couldn't connect");return;}
    console.log('server running on port ', server.address().port)
})