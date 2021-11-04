import React, {useState} from 'react';

const posterImg = path =>
  path ? <img src={'https://image.tmdb.org/t/p/w92' + path}/> : undefined;

const MovieListItem = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const movie = props.movie;
  return collapsed
    ? (
      <li>
        <p onClick={() => setCollapsed(false)}>
          {props.movie.title}
        </p>
      </li>
    ) : (
      <li>
        <p onClick={() => setCollapsed(true)} className='green'>
          {props.movie.title}
        </p>
        <aside>
          <table>
            <tbody>
              {Object.entries(movie.imdbData).map(([key, val]) =>
                <tr key={key}><th>{key}</th><td>{val}</td></tr>
              )}
              <tr>
                <th>Watched</th>
                <td>
                  <button
                    type='button'
                    onClick={() => props.toggleWatched(movie.i)}
                    className={movie.watched ? 'green' : undefined}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {posterImg(movie.poster)}
        </aside>
      </li>
    );
};

const MovieList = (props) =>
  props.movies.length === 0
    ? <ul><span>No movie found</span></ul>
    : (
      <ul>
        {props.movies.map(item =>
          <MovieListItem
            movie={item}
            key={item.title}
            toggleWatched={props.toggleWatched}
          />
        )}
      </ul>
    );

export default MovieList;
