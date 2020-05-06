import React, { useState, useEffect } from "react"
import axios from 'axios';

import apiKey from '../config/apiCredentials'

const Movie = (props) => {
    const [ movie, setMovie ] = useState({})

    useEffect(() => {
        let isFetching = true;
        const fetchMoviesFromAPI = async () => {
            //   console.log('movie')
            const response = await axios(`https://api.themoviedb.org/3/movie/${props.movieID}?api_key=${apiKey.key}`)
            console.log(response.data.title)
            if(isFetching){
                setMovie({
                    title:response.data.title,
                    imgPath: 'https://image.tmdb.org/t/p/w500/'+ response.data.poster_path
                })
            }
            }

            fetchMoviesFromAPI()
        return () => isFetching=false;
    },[])

    // console.log(props.likedMovieID)

    const handleRemoveMovie = async () => {
        await axios.post('http://localhost/user/removeLiked', 
         {movieID: props.likedMovieID}).then(response => console.log(response))
        props.onRemove(props.likedMovieID)
    }

    // console.log(movie.title)
    return(
        <div className="movie">
            <h1>{movie.title}</h1>
            <img src={movie.imgPath} alt="movie poster"/>
            <button onClick={handleRemoveMovie}>Remove from watchlist</button>
        </div>
    )
}

export default Movie