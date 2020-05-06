const router = require('express').Router();

const LikedMovies = require("../models/LikedMovies");
// let sess;
sess = false;

router.get('/user/liked', async (req, res) => {
    if(!sess){
        return res.send({error: "please log in"})
    }
    const { id } = sess.user
    const likedMovies = await LikedMovies.query().select().where({user_id: id})
    return res.send(likedMovies)
})

router.post('/user/likeMovie', async(req, res) => {
    const { movieID } = req.body
    if(!movieID){
        // console.log('like a movie route')
        return res.send({error: 'missing fields'})
    }
    if(!sess){
        return res.send({error: "please log in"})
    }
    // else{ see if movie is already liked
    const alreadyLiked = await LikedMovies.query().select().where({user_id:sess.user.id}).andWhere({ movie_id:movieID }).limit(1)
    if(alreadyLiked[0]){
        return res.status(500).send({ error: "Already on your watchlist"});
    }
    //     try{
            const likedMovie = await LikedMovies.query().insert({ 
                movie_id:movieID,
                user_id: sess.user.id
            })
            return res.send({likedMovie})
    //     }
    //     catch(error){
    //         if(error){return res.send(error)}
    //     }
    // }
})
router.post('/user/removeLiked', async (req, res) => {
    const { movieID } = req.body
    if(!sess){
        return res.send({error: 'log in to remove from watchlist'})
    }
    const likedMovie = await LikedMovies.query().select().where({ id: movieID }).limit(1)
    if(!likedMovie[0]){
        return res.send({error: 'Movie not on your watchlist'})
    }
    const removedMovie = await LikedMovies.query().delete().where({ id:movieID })
    return res.send({removedMovie})
})

module.exports = router;