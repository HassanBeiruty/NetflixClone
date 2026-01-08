import { useState, useEffect, useRef } from 'react'
import { Movie } from '../types/Movie'
import MovieCard from './MovieCard'
import './styles/Home.css'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''
const BASE_URL = 'https://api.themoviedb.org/3'
const getUrl = (query: string) => 
  query ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}` 
       : `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const debounceTimer = useRef<number | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isSearching = searchQuery.trim() !== ''

  const fetchMovies = async (query: string, isInitial = false) => {
    isInitial ? setLoading(true) : setSearchLoading(true)
    try {
      const data = await fetch(getUrl(query)).then(r => r.json())
      setMovies(data.results || [])
    } catch (err) {
      console.error('Error:', err)
      setMovies([])
    } finally {
      isInitial ? setLoading(false) : setSearchLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies('', true)
  }, [])

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    const query = searchQuery.trim()
    debounceTimer.current = window.setTimeout(() => fetchMovies(query, false), 500)
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current) }
  }, [searchQuery])

  if (loading) return <div className="page-container"><div className="loading">Loading movies...</div></div>

  return (
    <div className="page-container">
      <div className="home-header">
        <h1>{isSearching ? 'Search Results' : 'Popular Movies'}</h1>
        <p>{isSearching ? `Found ${movies.length} results for "${searchQuery}"` : 'Discover the most popular movies right now'}</p>
      </div>
      
      <div className="search-container">
        <label htmlFor="movie-search" className="search-label">Search Movies</label>
        <div className="search-input-wrapper">
          <input
            id="movie-search"
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
          {searchLoading && <span className="search-loading">⏳</span>}
          {searchQuery && !searchLoading && (
            <button className="clear-search-btn" onClick={() => { setSearchQuery(''); searchInputRef.current?.focus() }} aria-label="Clear search">✕</button>
          )}
        </div>
      </div>

      {movies.length === 0 && !loading && isSearching && (
        <div className="no-results">
          <p>No movies found for "{searchQuery}"</p>
          <p className="no-results-hint">Try a different search term</p>
        </div>
      )}

      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  )
}

export default Home

