import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiKey from '../config/apiCredentials'
import { Link } from 'react-router-dom';

const Home = () => {
    const [ movies, setMovies ] = useState([])

    useEffect(() => {
        
        axios(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey.key}&language=en-US&page=1`)
       .then(response =>
        // console.log(response)
        response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          posterPath :`https://image.tmdb.org/t/p/w500/${movie.poster_path}` ,
          overview: movie.overview
        }))
       )
        .then(data => {
            setMovies(data)
        })
    }, [])

    const handleClick = () => {
        
    }
  
    return(
        <div className="moviesContainer">
            <h1>Popular Movies</h1>
            { movies.map( (movie)=> {
                return (
                <div className="movie" key={movie.id} id={"movie-"+movie.id}>
                    <img src={movie.posterPath}/>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <Link to={"/movieReview/"+movie.id} >See Reviews</Link>                   
                    <button onClick={handleClick}>Add to Watchlist</button>
                </div>
                )
            })}
        </div>
    )
}

export default Home