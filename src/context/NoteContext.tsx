import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Movie } from '../types/Movie'

interface NoteData {
  movie: Movie
  note: string
}

interface NoteContextType {
  notes: { [movieId: number]: NoteData }
  addNote: (movie: Movie, note: string) => void
  updateNote: (movieId: number, note: string) => void
  deleteNote: (movieId: number) => void
  getNote: (movieId: number) => string | undefined
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)
const STORAGE_KEY = 'netflix-clone-notes'

export const useNoteContext = () => {
  const context = useContext(NoteContext)
  if (!context) throw new Error('useNoteContext must be used within NoteProvider')
  return context
}

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<{ [movieId: number]: NoteData }>({})

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY)
    setNotes(data ? JSON.parse(data) : {})
  }, [])

  const addNote = (movie: Movie, note: string) => {
    const updated = { ...notes, [movie.id]: { movie, note } }
    setNotes(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const updateNote = (movieId: number, note: string) => {
    if (notes[movieId]) {
      const updated = { ...notes, [movieId]: { movie: notes[movieId].movie, note } }
      setNotes(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
  }

  const deleteNote = (movieId: number) => {
    const updated = { ...notes }
    delete updated[movieId]
    setNotes(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const getNote = (movieId: number) => notes[movieId]?.note

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNote }}>
      {children}
    </NoteContext.Provider>
  )
}

