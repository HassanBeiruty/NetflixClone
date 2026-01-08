import { Movie } from '../types/Movie'
import { useMovieContext } from '../context/MovieContext'
import './styles/MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useMovieContext()
  const favorite = isFavorite(movie.id)
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
        <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); favorite ? removeFavorite(movie.id) : addFavorite(movie) }} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="movie-year">{new Date(movie.release_date).getFullYear()}</span>
        </div>
        <p className="movie-overview">{movie.overview.substring(0, 100)}...</p>
      </div>
    </div>
  )
}

export default MovieCard

