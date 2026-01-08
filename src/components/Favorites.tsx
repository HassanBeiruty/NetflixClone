import { useMovieContext } from '../context/MovieContext'
import MovieCard from './MovieCard'
import './styles/Favorites.css'

const Favorites = () => {
  const { favorites } = useMovieContext()
  return (
    <div className="page-container">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        {favorites.length > 0 && <p>{favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved</p>}
      </div>
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Go to the Home page and click the heart icon on movies you like!</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  )
}

export default Favorites

