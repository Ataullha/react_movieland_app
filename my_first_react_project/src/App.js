import React, { useState } from 'react';
import { useEffect } from 'react';

import './App.css';
import SearchIcon from './search.svg';

import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=b857cd55';

// const movie = {
//     "Title": "Naruto the Movie 3: Guardians of the Crescent Moon Kingdom",
//     "Year": "2006",
//     "imdbID": "tt1071815",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNjk2ZWIzOTYtMGUxMC00MzdhLWI3ZGMtZGJhNzZmMDYxYjJlXkEyXkFqcGdeQXVyMjQ3NTQ4MjQ@._V1_SX300.jpg"
// };

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const respose = await fetch(`${API_URL}&s=${title}`);
        const data = await respose.json();

        setMovies(data.Search);
    }

    useEffect(
        () => {
            searchMovies('Spiderman');
        }
        , []);


    return (
        <div className='app'>

            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search for movies'
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;