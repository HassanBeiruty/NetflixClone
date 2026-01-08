import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Movie } from '../types/Movie'
import { getFavorites, addToFavorites, removeFromFavorites } from '../utils/favorites'

interface MovieContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export const useMovieContext = () => {
  const context = useContext(MovieContext)
  if (!context) throw new Error('useMovieContext must be used within MovieProvider')
  return context
}

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([])
  useEffect(() => setFavorites(getFavorites()), [])
  return (
    <MovieContext.Provider value={{
      favorites,
      addFavorite: (movie) => { addToFavorites(movie); setFavorites(getFavorites()) },
      removeFavorite: (id) => { removeFromFavorites(id); setFavorites(getFavorites()) },
      isFavorite: (id) => favorites.some(m => m.id === id)
    }}>
      {children}
    </MovieContext.Provider>
  )
}

