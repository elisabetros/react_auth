import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiKey from '../config/apiCredentials'
import { Link } from 'react-router-dom';
import isAuthorized from '../custom_hooks/isAuthorized';

const Home = (props) => {
    const [ movies, setMovies ] = useState([])
    const [ error, setError ] = useState('')
    const [ successMessage, setSuccessMessage ] = useState('') 

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

    const handleClick = async (e, id) => {
        // console.log('click, like movie')
        e.preventDefault()
        // console.log(e.target.parentElement.id)
        if(!props.isAuthorized){
            setError('log in to add a movie to your watchlist')
            return
        }
        await axios.post('http://localhost/user/likeMovie', {
            movieID: id
        }).then(response => {
            if(response.data.error){
                setError(response.data.error)
            }
            else{
                setSuccessMessage('Added to your watchlist')
                setError('')
                setTimeout(()=> {
                    setSuccessMessage('')
                },3000)
            }
        })
        // console.log(data)
    }
  
    return(
        <div className="moviesContainer">
            {error || successMessage ?
                <div className={error? 'error': 'successMessage'}>{error? error: successMessage}</div> :
                ''
            }
            <h1>Popular Movies</h1>
            { movies.map( (movie)=> {
                return (
                <div className="movie" key={movie.id} id={"movie-"+movie.id}>
                    <img src={movie.posterPath}/>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <div>
                        <Link to={"/movieReview/"+movie.id} >See Reviews</Link>                   
                        <button onClick={(e) => handleClick(e,movie.id)}>Add to Watchlist</button>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default isAuthorized(Home);