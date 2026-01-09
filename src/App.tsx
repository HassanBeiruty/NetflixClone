import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import { NoteProvider } from './context/NoteContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Favorites from './components/Favorites'
import Notes from './components/Notes'
import './App.css'

const App = () => (
  <MovieProvider>
    <NoteProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </Router>
    </NoteProvider>
  </MovieProvider>
)

export default App

