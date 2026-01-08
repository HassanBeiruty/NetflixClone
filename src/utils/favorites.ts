import { Movie } from '../types/Movie'

const KEY = 'netflix-clone-favorites'

export const getFavorites = (): Movie[] => {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export const addToFavorites = (movie: Movie): void => {
  const favorites = getFavorites()
  if (!favorites.find(m => m.id === movie.id)) {
    favorites.push(movie)
    localStorage.setItem(KEY, JSON.stringify(favorites))
  }
}

export const removeFromFavorites = (movieId: number): void => {
  localStorage.setItem(KEY, JSON.stringify(getFavorites().filter(m => m.id !== movieId)))
}

export const isFavorite = (movieId: number): boolean => getFavorites().some(m => m.id === movieId)

