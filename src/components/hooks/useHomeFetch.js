import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useHomeFetch = (searchTerm) => {
    const [state, setState] = useState({movies: [] })
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchMovies( endpoint) {
        setError(null)
        setLoading(true)

        const isLoadMore = endpoint.search('page')

        try{
            const result = await (await fetch(endpoint)).json()
            console.log(result)
            setState(prev => ({
                ...prev,
                movies: 
                isLoadMore !== -1 
                ? [...prev.movies, ...result.results] 
                : [...result.results],
                heroImage: prev.heroImage || result.results[0],
                currentPage: result.page,
                totalPages: result.total_pages
            }))
     
        } catch(error) {
            setError(error)
        }

        setLoading(false)
    }

    //fetch popular movies initially on mount
    useEffect(() => {
        if(sessionStorage.homeState) {
            setState(JSON.parse(sessionStorage.homeState))
            setLoading(false)

        }else {
            fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`)
        }
        
    },[])

    useEffect(()=> {
        if(!searchTerm) {
            console.log("writing to session")
            sessionStorage.setItem('homeState', JSON.stringify(state))
        }

    },[searchTerm, state])

    return [{state,loading,error}, fetchMovies]
}