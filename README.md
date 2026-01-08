# Netflix Clone - React + TypeScript

A beginner-friendly Netflix clone built with React, TypeScript, and Vite. Browse popular movies, add them to your favorites, and manage your collection - all without a backend!

## Features

- 🏠 **Home Page**: Browse popular movies fetched from The Movie Database (TMDB) API
- ❤️ **Favorites**: Save your favorite movies locally using browser storage
- 🎨 **Modern UI**: Netflix-inspired dark theme design
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Fast**: Built with Vite for lightning-fast development

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. **Set up your TMDB API key** (Required):
   - Get a free API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Create a `.env` file in the project root
   - Add the following line: `VITE_TMDB_API_KEY=your_api_key_here`
   - Replace `your_api_key_here` with your actual API key from TMDB
   - **Important**: Restart the development server after creating/updating the `.env` file

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # All React components
│   ├── Home.tsx        # Home page with movie search
│   ├── Favorites.tsx   # Favorites page
│   ├── MovieCard.tsx   # Movie card component
│   ├── Navbar.tsx      # Navigation bar
│   └── styles/         # All CSS files
│       ├── Home.css
│       ├── Favorites.css
│       ├── MovieCard.css
│       └── Navbar.css
├── context/            # React Context
│   └── MovieContext.tsx # Favorites management
├── types/              # TypeScript definitions
│   └── Movie.ts
└── App.tsx             # Main app component
```

## How It Works

- **Movie Data**: Fetched from The Movie Database (TMDB) API
- **Favorites Storage**: Uses browser's localStorage via React Context
- **Routing**: React Router for navigation between pages
- **Styling**: Component-specific CSS organized in styles folder

## Usage

1. **Browse Movies**: Visit the Home page to see popular movies
2. **Add to Favorites**: Click the heart icon (🤍) on any movie card
3. **View Favorites**: Navigate to the Favorites page to see your saved movies
4. **Remove Favorites**: Click the filled heart (❤️) to remove a movie from favorites

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- The Movie Database (TMDB) API

## License

This project is for educational purposes.

