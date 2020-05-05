const router = require('express').Router();

const LikedMovies = require("../models/LikedMovies");
// let sess;

router.get('/user/liked', async (req, res) => {
    if(!sess){
        return res.send({response: "please log in"})
    }
    const { id } = sess.user
    const likedMovies = await LikedMovies.query().select().where({user_id: id})
    return res.send(likedMovies)
})

router.post('/user/likeMovie', async(req, res) => {
    const { id, title } = req.body
    if(!id && !title){
        console.log('bla')
        return res.send({response: 'missing fields'})
    }
    if(!sess){
        return res.send({response: "please log in"})
    }
    // else{
    //     try{
            const likedMovie = await LikedMovies.query().insert({ 
                id:id,
                title:title,
                user_id: sess.user.id
            })
            return res.send({likedMovie})
    //     }
    //     catch(error){
    //         if(error){return res.send(error)}
    //     }
    // }
})

module.exports = router;