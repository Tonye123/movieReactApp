import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useHomeFetch = () => {
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

    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`)
    },[])

    return [{state,loading,error}, fetchMovies]
}