import config from './config/config.js';

const IMDB = {};

const nonAlphaNumeric = /[^a-z0-9]/;

const stripTitle = title => title.toLowerCase().replace(nonAlphaNumeric, '');

IMDB.request = (method, params, successCB, errorCB) => {
  const urlParams = new URLSearchParams(params);
  urlParams.set('api_key', config.apiKeys.imdb);
  const target = new URL(`https://api.themoviedb.org/3${method}`);
  target.search = urlParams.toString();

  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      const status = request.status;
      if (status === 0 || status >= 200 && status < 400) {
        successCB(JSON.parse(request.responseText));
      } else if (errorCB) {
        errorCB(request.status);
      }
    }
  };
  request.open('GET', target, true);
  request.send();
};

IMDB.genres = {};

IMDB.request('/genre/movie/list', {}, response => {
  for (const genre of response.genres) {
    IMDB.genres[genre.id] = genre.name;
  }
});

IMDB.lookup = (query, callback) => IMDB.request('/search/movie', {query}, response => {
  const pattern = query.trim().toLowerCase();
  const needle = pattern.replace(nonAlphaNumeric, '');
  if (response.total_results > 0) {
    const strippedQuery = stripTitle(query);
    for (const result of response.results) {
      const pattern = result.title.trim().toLowerCase();
      if (pattern.replace(nonAlphaNumeric, '') === needle) {
        callback({
          title: result.title,
          pattern,
          watched: false,
          poster: result.poster_path,
          imdbData: {
            'Year': Number.parseInt(result.release_date),
            'imdbRating': result.vote_average,
            'Genres': result.genre_ids.map(genre => IMDB.genres[genre]).sort().join(', ')
          }
        });
        return;
      }
    }
  }
  callback({
    title: query,
    pattern: query.trim().toLowerCase(),
    watched: false,
    imdbData: {},
  });
});

export default IMDB;
