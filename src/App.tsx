import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import './App.css'

const App = () => (
  <MovieProvider>
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  </MovieProvider>
)

export default App

