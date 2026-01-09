import { useState } from 'react'
import { Movie } from '../types/Movie'
import { useMovieContext } from '../context/MovieContext'
import { useNoteContext } from '../context/NoteContext'
import './styles/MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useMovieContext()
  const { getNote, addNote, deleteNote } = useNoteContext()
  const favorite = isFavorite(movie.id)
  const hasNote = !!getNote(movie.id)
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [noteText, setNoteText] = useState('')
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'

  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleNoteClick = (e: React.MouseEvent) => {
    stopPropagation(e)
    setNoteText(getNote(movie.id) || '')
    setShowNoteEditor(true)
  }

  const handleNoteSave = (e: React.MouseEvent) => {
    stopPropagation(e)
    noteText.trim() ? addNote(movie, noteText.trim()) : deleteNote(movie.id)
    setShowNoteEditor(false)
  }

  const handleNoteCancel = (e: React.MouseEvent) => {
    stopPropagation(e)
    setShowNoteEditor(false)
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
        <div className="movie-actions">
          <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={(e) => { stopPropagation(e); favorite ? removeFavorite(movie.id) : addFavorite(movie) }} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
            {favorite ? '❤️' : '🤍'}
          </button>
          <button className={`note-btn ${hasNote ? 'active' : ''}`} onClick={handleNoteClick} aria-label={hasNote ? 'Edit note' : 'Add note'}>
            📝
          </button>
        </div>
      </div>
      {showNoteEditor && (
        <div className="note-editor-popup" onClick={(e) => e.stopPropagation()}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note about this movie..."
            className="note-editor-textarea"
            rows={4}
            autoFocus
          />
          <div className="note-editor-actions">
            <button onClick={handleNoteSave} className="note-save-btn">Save</button>
            <button onClick={handleNoteCancel} className="note-cancel-btn">Cancel</button>
          </div>
        </div>
      )}
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

