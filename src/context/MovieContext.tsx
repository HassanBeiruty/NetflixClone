import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Movie } from '../types/Movie'

interface MovieContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)
const STORAGE_KEY = 'netflix-clone-favorites'

export const useMovieContext = () => {
  const context = useContext(MovieContext)
  if (!context) throw new Error('useMovieContext must be used within MovieProvider')
  return context
}

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY)
    setFavorites(data ? JSON.parse(data) : [])
  }, [])

  const addFavorite = (movie: Movie) => {
    if (!favorites.find(m => m.id === movie.id)) {
      const updated = [...favorites, movie]
      setFavorites(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
  }

  const removeFavorite = (movieId: number) => {
    const updated = favorites.filter(m => m.id !== movieId)
    setFavorites(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const isFavorite = (movieId: number) => favorites.some(m => m.id === movieId)

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </MovieContext.Provider>
  )
}
