import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

import apiKey from '../config/apiCredentials';
import axios from 'axios';
import isAuthorized from '../custom_hooks/isAuthorized';

const MovieReview = ({ match: { params: { id } } ,isAuthorized}, ) => {
    const [ reviews, setReviews ] = useState([])
    const [ movie, setMovie ] = useState([])
            

    console.log(isAuthorized)

    useEffect(() => {
        let isFetching = true
        axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey.key}`)
        .then(response=> {
            console.log(response.data)
            if(isFetching){
                    setMovie(response.data)
                    console.log(movie)
                }
        })
        //     response.data.map( movie => {
        //         console.log(movie)
        //     })
        // )
            // .then()
            
            // 
        // })
        axios(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey.key}`)
        .then(response=> {
            console.log(response.data)
            if(isFetching){
                setReviews(response.data.results)
            }
        })
        return () => isFetching=false
    },[])

    if(!isAuthorized){
        return <h1>Log in to see reviews</h1>
    }


    if(!id){
        return (
            <Redirect to="/" />
        )
    }
  
    // reviews.map
    return(
        <>
            <h1>{movie.title}</h1>
            <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}/>
            <div className ="reviewsContainer">
                {reviews.map(review=>{
                    return(
                    <div className="review">
                    <h3>{review.author}</h3>
                    <p>{review.content}</p>
                    </div>)
                })}
            </div>
        </>
    )   
}

export default isAuthorized(MovieReview)