const { Model } = require('objection');

class LikedMovies extends Model {
    static get tableName(){
        return "liked_movies";
    }
   static get idColumn(){
       return 'id';
   }
}

module.exports = LikedMovies;