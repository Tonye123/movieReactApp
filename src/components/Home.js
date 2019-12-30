import React, {useState,useEffect} from 'react';
import {API_URL,
        API_KEY,
        API_BASE_URL, 
        POSTER_SIZE, 
        BACKDROP_SIZE,
        IMAGE_BASE_URL
     } from '../config';


//import components

import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreBtn from './elements/LoadMoreBtn';
import Spinner from './elements/Spinner';

//custom hooks
import { useHomeFetch } from './hooks/useHomeFetch';


const Home = () =>  {

    const[{ state, loading, error }, fetchMovies] = useHomeFetch();
    const [searchTerm,setSearchTerm] = useState('');

    const searchMovies = search => {
        
        const endpoint = search ? `${API_URL}search/movie?api_key=${API_KEY}&query=${search}`
                                : `${API_URL}movie/popular?api_key=${API_KEY}`
        
        setSearchTerm(search);
        fetchMovies(endpoint);
    }

    
    const loadMoreMovies = () => {
        const searchEndpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${state.currentPage + 1}`

        const popularEndpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${state.currentPage + 1}`

        const endpoint = searchTerm ? searchEndpoint : popularEndpoint;
        fetchMovies(endpoint)
    }


    if(error) return <div>Something went wrong....</div>
    if(!state.movies[0]) return <Spinner />
   

 return (
    <>
      { !searchTerm &&  <HeroImage image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`} 
        title = {state.heroImage.original_title}
        text = {state.heroImage.overview} /> }
        <SearchBar callback={searchMovies} />
        <Grid header={ searchTerm ? 'Search Result' : 'Popular Movies'} >
            {state.movies.map(movie => (
                <MovieThumb
                key={movie.id}
                clickable
                image={ 
                   movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : 'Noimage'
                }
                movieId={movie.id}
                movieName={movie.original_title}
                />
            ))}

        </Grid>
       
        { state.loading && <Spinner />}
        {state.currentPage < state.totalPages && !state.loading && <LoadMoreBtn text="Load More" callback={loadMoreMovies} />}
        
    </>

)


}


export default Home;