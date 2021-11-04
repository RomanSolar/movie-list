import React, {useEffect, useState} from 'react';
import AddMovie from './AddMovie.jsx';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import WatchTab from './WatchTab.jsx';
import IMDB from '../imdb.js';

const loadMovies = (addMovie) => {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      for (const title of JSON.parse(request.responseText)) {
        addMovie(title);
      }
    }
  };
  request.open('GET', '/api/movies', true);
  request.send();
};

const App = () => {
  const [filter, setFilter] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchedMustBe, setWatchedMustBe] = useState(null);

  const addMovie = (title) => IMDB.lookup(title, movie => {
    if (movies.every(other => movie.title !== other.title)) {
      setMovies(movies => {
        movie.i = movies.length;
        return [...movies, movie];
      });
    }
  });

  useEffect(() => loadMovies(addMovie), []);

  const toggleWatched = (i) => setMovies(movies => {
    const newMovies = movies.slice();
    newMovies[i].watched = !newMovies[i].watched;
    return newMovies;
  });

  let movieList = movies;
  if (watchedMustBe !== null) {
    movieList = movieList.filter(movie => movie.watched === watchedMustBe);
  }
  if (filter.length > 0) {
    movieList = movieList.filter(movie => movie.pattern.indexOf(filter) !== -1);
  }

  return (
    <div>
      <h1>MovieList</h1>
      <AddMovie addMovie={addMovie}/>
      <nav>
        {[true, false].map(intent =>
          <WatchTab
            intent={intent}
            current={watchedMustBe}
            set={setWatchedMustBe}
            key={intent}
          />
        )}
        <Search setFilter={setFilter}/>
      </nav>
      <MovieList
        title='MovieList'
        movies={movieList}
        toggleWatched={toggleWatched}
      />
    </div>
  );
};

export default App;
