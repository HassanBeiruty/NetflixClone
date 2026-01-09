import { useState } from 'react'
import { useNoteContext } from '../context/NoteContext'
import { Movie } from '../types/Movie'
import MovieCard from './MovieCard'
import './styles/Notes.css'

const Notes = () => {
  const { notes, updateNote, deleteNote } = useNoteContext()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const moviesWithNotes: Movie[] = Object.values(notes).map(noteData => noteData.movie)

  const handleEdit = (movieId: number, currentNote: string) => {
    setEditingId(movieId)
    setEditText(currentNote)
  }

  const handleSave = (movieId: number) => {
    editText.trim() ? updateNote(movieId, editText.trim()) : deleteNote(movieId)
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  return (
    <div className="page-container">
      <div className="notes-header">
        <h1>My Notes</h1>
        {moviesWithNotes.length > 0 && <p>{moviesWithNotes.length} {moviesWithNotes.length === 1 ? 'note' : 'notes'} saved</p>}
      </div>
      {moviesWithNotes.length === 0 ? (
        <div className="empty-notes">
          <p>You haven't added any notes yet.</p>
          <p>Click the note icon (📝) on any movie to add a personal note!</p>
        </div>
      ) : (
        <div className="notes-list">
          {moviesWithNotes.map((movie) => (
            <div key={movie.id} className="note-item">
              <MovieCard movie={movie} />
              <div className="note-content">
                {editingId === movie.id ? (
                  <div className="note-editor">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="Write your note..."
                      className="note-textarea"
                      rows={4}
                    />
                    <div className="note-actions">
                      <button onClick={() => handleSave(movie.id)} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="note-display">
                    <p className="note-text">{notes[movie.id]?.note}</p>
                    <div className="note-actions">
                      <button onClick={() => handleEdit(movie.id, notes[movie.id]?.note || '')} className="edit-btn">Edit</button>
                      <button onClick={() => deleteNote(movie.id)} className="delete-btn">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notes

